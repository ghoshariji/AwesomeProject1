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
import {verifyPayment} from '../api/adminApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, {Toast} from 'toastify-react-native';
const Courses = ({navigation}) => {
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
        Toast.success('Payment Successfully');
      } else {
        Toast.error('Your Money is Safe ...Please Wait ...');
      }
    } catch (error) {
      console.log('Error ' + error);
      Toast.error('Payment Failed');
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
          Toast.error('Payment Failed');
        });
    } catch (error) {
      Toast.error('Payment Failed, Error to fetch Data');
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
      <ToastManager />

      {/* Courses list */}
      <ScrollView style={{marginBottom: 50}}>
        <View style={styles.leftSection}>
          {loading && <Loader />}
          {filteredCourses.map(course => (
            <View key={course._id} style={styles.courseItem}>
              {showAllCourses &&
                !myCourses.some(
                  myCourseItem => myCourseItem._id === course._id,
                ) && (
                  <>
                    <View style={styles.card12}>
                      <View style={styles.headercourse}>
                        <Text style={styles.headerTextcourse}>
                          {course.coursename} 2024 batch
                        </Text>
                        <View style={styles.newBadgecourse}>
                          <Text style={styles.newBadgeTextcourse}>New</Text>
                        </View>
                      </View>
                      <Image
                        source={{
                          uri: `https://academic-server-native.onrender.com/upload/${course.courseImg}`,
                        }}
                        style={styles.cardImage12}
                      />
                      <View style={styles.cardContent12}>
                        <Text style={styles.cardTitle12}>
                          {course.coursename}
                        </Text>
                        <Text style={styles.cardSubtitle12}>
                          ☆ {course.coursetitle}
                        </Text>
                        <Text style={styles.cardDescription12}>
                          ☆ Valid till {course.courseduration} year from the
                          purchase Date
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.cardPrice12}>
                            ☆ ₹ {course.courseprice} /-
                          </Text>
                          <Text style={styles.cardDiscount12}>
                            Discount of 25% applied
                          </Text>
                        </View>
                      </View>
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
                    <View style={styles.priceContainer}></View>
                  </>
                )}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {showAllCourses &&
                  !myCourses.some(
                    myCourseItem => myCourseItem._id === course._id,
                  ) && (
                    <View style={styles.cardButtons12}>
                      <TouchableOpacity
                        style={styles.exploreButton12}
                        onPress={() => handleExplore(course)}>
                        <Text style={styles.epxlore12}>EXPLORE</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buyButton12}
                        onPress={() =>
                          handlePayment(course._id, course.courseprice)
                        }>
                        <Text style={styles.buttonText12}>BUY NOW</Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
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
    marginBottom: 1,
    fontSize: 24,
    color: 'black',
    fontFamily: 'Rowdies-Light',
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

  card12: {
    backgroundColor: '#ebeffc',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardImage12: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    margin: 1,
  },
  cardContent12: {
    padding: 16,
    fontFamily: 'Rowdies-Regular',
  },
  cardTitle12: {
    fontSize: 18,
    fontFamily: 'Rowdies-Regular',
    marginBottom: 8,
    color: 'black',
  },
  cardSubtitle12: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    color: 'black',
  },
  cardDescription12: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
  },
  cardPrice12: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  cardDiscount12: {
    fontSize: 14,
    color: 'green',
    marginBottom: 16,
  },
  cardButtons12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  exploreButton12: {
    backgroundColor: '#cdd9f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '48%',
  },
  buyButton12: {
    backgroundColor: '#214bbf',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '48%',
  },
  buttonText12: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Rowdies-Light',
  },
  epxlore12: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Rowdies-Light',
  },
  headercourse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTextcourse: {
    fontSize: 18,
    color: '#000',
    fontFamily:'Rowdies-Bold'

  },
  newBadgecourse: {
    backgroundColor: '#FFD700',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeTextcourse: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Courses;
