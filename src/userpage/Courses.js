import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {fetchCourse, fetchUserDetails} from '../api/userApi';
import Loader from '../loader/Loader2';
import {handlePayment1} from '../api/authApi';
import Button from '../componets/Button';
import {color} from 'react-native-elements/dist/helpers';
import {verifyPayment} from '../api/adminApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Courses = ({navigation}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQRData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState([]);
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userphone, setUserphone] = useState('');
  const [usertoken, setuserToken] = useState('');
  const [myCourses, setMyCourse] = useState([]);
  const fetchCourse1 = async () => {
    try {
      // fethcing the user details
      const name = await AsyncStorage.getItem('name');
      const email = await AsyncStorage.getItem('email');
      const phone = await AsyncStorage.getItem('phone');
      const token = await AsyncStorage.getItem('token');
      setUsername(name);
      setUseremail(email);
      setUserphone(phone);
      setuserToken(token);
      const data = await fetchCourse();
      setLoading(false);
      setCourse(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    setLoading(true);
    fetchCourse1();
  }, []);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const data = await fetchUserDetails(token);
      setMyCourse(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredCourses = showAllCourses
    ? course.filter(course =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : myCourses.filter(course =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleExplore = course => {
    navigation.navigate('Explore', {course});
  };

  const checkPayment = async (courseId, data1, usertoken) => {
    try {
      const data = await verifyPayment({courseId, data1, usertoken});
      if (data.success) {
        Toast.show({
          type: 'success',
          text1: 'Payment Successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Your Money is Safe ...Please Wait ...',
        });
      }
    } catch (error) {
      console.log('Error ' + error);
      Toast.show({
        type: 'error',
        text1: 'Payment Failed',
      });
    }
  };
  const handlePayment = async (courseId, price) => {
    try {
      const data = {
        amount: price,
        currency: 'INR',
        receipt: 'receipt#1',
      };
      const response = await handlePayment1(data);
      const order = response.data;
      var options = {
        description: 'Barasat Academic Association',
        image:
          'https://barasatacademicassociation.com/wp-content/uploads/2022/08/baalogocolor.jpg',
        currency: 'INR',
        key: 'rzp_test_6Fsll3myRMs9xe',
        amount: price,
        name: 'Barasat Academic Association',
        order_id: order.id,
        prefill: {
          email: useremail,
          contact: userphone,
          name: username,
        },
        theme: {color: '#53a20e'},
      };

      RazorpayCheckout.open(options)
        .then(data => {
          checkPayment(courseId, data, usertoken);
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: `Payment Failed ${error}`,
          });
        });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Payment Failed ${error} , Error to fetch Details`,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Toggle buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            showAllCourses ? styles.activeButton : null,
          ]}
          onPress={() => setShowAllCourses(true)}>
          <Text style={styles.buttonText}>All Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !showAllCourses ? styles.activeButton : null,
          ]}
          onPress={() => setShowAllCourses(false)}>
          <Text style={styles.buttonText}>My Course</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          placeholderTextColor="black"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <Text style={styles.sectionHeader}>Courses</Text>
      <Toast />

      {/* Courses list */}
      <ScrollView>
        <View style={styles.leftSection}>
          {loading && <Loader />}
          {filteredCourses.map(course => (
            <View key={course._id} style={styles.courseItem}>
              {showAllCourses &&
                !myCourses.some(
                  myCourseItem => myCourseItem._id === course._id,
                ) && (
                  <>
                    <Image
                      source={{
                        uri: `https://academic-server-native.onrender.com/upload/${course.courseImg}`,
                      }}
                      style={styles.courseImage}
                    />

                    <Text style={styles.courseTitle}>{course.coursename}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>
                        ${course.courseprice}
                      </Text>
                      <Text style={styles.discountedPrice}>
                        ${course.price - course.discount}
                      </Text>

                      <Text style={styles.discount}>
                        {course.discount}% OFF
                      </Text>
                    </View>
                  </>
                )}

              {!showAllCourses &&
                myCourses.some(
                  myCourseItem => myCourseItem._id === course._id,
                ) && (
                  <>
                    <Image
                      source={{
                        uri: `https://academic-server-native.onrender.com/upload/${course.courseImg}`,
                      }}
                      style={styles.courseImage}
                    />

                    <Text style={styles.courseTitle}>{course.coursename}</Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>
                        ${course.courseprice}
                      </Text>
                      <Text style={styles.discountedPrice}>
                        ${course.price - course.discount}
                      </Text>

                      <Text style={styles.discount}>
                        {course.discount}% OFF
                      </Text>
                    </View>
                  </>
                )}

              {showAllCourses &&
                !myCourses.some(
                  myCourseItem => myCourseItem._id === course._id,
                ) && (
                  <Button
                    title="Explore Course"
                    onPress={() => handleExplore(course)}
                    filled
                    style={{
                      marginTop: 2,
                      marginBottom: 4,
                      backgroundColor: '#b3b3ff',
                      borderColor: '#b3b3ff',
                      padding: 1,
                      margin: 1,
                    }}
                  />
                )}
              {showAllCourses &&
                !myCourses.some(
                  myCourseItem => myCourseItem._id === course._id,
                ) && (
                  <Button
                    title="Buy Now"
                    onPress={() =>
                      handlePayment(course._id, course.courseprice)
                    }
                    filled
                    style={{marginTop: 2, marginBottom: 2}}
                  />
                )}

              {!showAllCourses &&
                myCourses.some(
                  myCourseItem => myCourseItem._id === course._id,
                ) && (
                  <Button
                    title="Go to Course"
                    onPress={() => navigation.navigate('My course', {course})}
                    filled
                    style={{
                      marginTop: 2,
                      marginBottom: 2,
                      backgroundColor: '#4d4dff',
                      borderColor: '#4d4dff',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                    textStyle={{color: 'black'}}
                  />
                )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    width: '47%',
    marginLeft: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#efeff5',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 24,
    color: 'black',
  },
  leftSection: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  courseItem: {
    marginBottom: 20,
  },
  courseImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    color: 'black',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    marginRight: 5,
    color: 'black',
  },
  discountedPrice: {
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  discount: {
    color: 'green',
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  buyNowText: {
    color: 'white',
    fontWeight: 'bold',
  },
  exploreButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 2,
  },
  exploreText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
  payNowButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  payNowText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Courses;
