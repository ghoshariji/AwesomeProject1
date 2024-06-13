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
  Linking,
  Modal,
  Alert,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {fetchCourse} from '../api/userApi';
import Loader from '../loader/Loader2';
import {handlePayment1} from '../api/authApi';
import Button from '../componets/Button';
import {color} from 'react-native-elements/dist/helpers';
import {verifyPayment} from '../api/adminApi';
import Toast from 'react-native-toast-message';
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
  const fetchCourse1 = async () => {
    try {
      const data = await fetchCourse();
      setLoading(false);
      setCourse(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    setLoading(true);
    fetchCourse1();
  }, []);

  const myCourses = [
    {
      id: 4,
      name: 'My Course 1',
      image: require('../assets/welcome.jpg'),
      price: 145,
      discount: 30,
      lectures: [
        {
          video: require('../assets/a.mp4'),
          title: 'Introduction 1',
          description: 'Introduction of basic',
        },
      ],
      exams: [
        {
          examname: 'Polity',
          duration: '20',
          questions: [
            {
              question: 'what is polity?',
              options: [
                {label: 'Ada', value: 'A'},
                {label: 'Bdsa', value: 'B'},
                {label: 'Cds', value: 'C'},
                {label: 'Ddas', value: 'D'},
              ],
              correct: 'A',
            },
            {
              question: 'what is economics?',
              options: [
                {label: 'Adsa', value: 'A'},
                {label: 'Bdsadsa', value: 'B'},
                {label: 'Cdsa', value: 'C'},
                {label: 'Ddsa', value: 'D'},
              ],
              correct: 'A',
            },
          ],
        },
        {
          examname: 'Geography',
          duration: '20',
          questions: [
            {
              question: 'what is polity?',
              options: [
                {label: 'Ada', value: 'A'},
                {label: 'Bdsa', value: 'B'},
                {label: 'Cds', value: 'C'},
                {label: 'Ddas', value: 'D'},
              ],
              correct: 'A',
            },
            {
              question: 'what is economics?',
              options: [
                {label: 'Adsa', value: 'A'},
                {label: 'Bdsadsa', value: 'B'},
                {label: 'Cdsa', value: 'C'},
                {label: 'Ddsa', value: 'D'},
              ],
              correct: 'A',
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'My Course 2',
      image: require('../assets/welcome.jpg'),
      price: 199,
      discount: 40,
    },
    {
      id: 6,
      name: 'My Course 3',
      image: require('../assets/welcome.jpg'),
      price: 179,
      discount: 55,
    },
    // Add more courses as needed
  ];

  const filteredCourses = showAllCourses
    ? course.filter(course =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : myCourses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleExplore = course => {
    navigation.navigate('Explore', {course});
  };

  const checkPayment = async data1 => {
    try {
      const data = await verifyPayment(data1);
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
  const handlePayment = async () => {
    try {
      const data = {
        amount: 5000,
        currency: 'INR',
        receipt: 'receipt#1',
      };
      const response = await handlePayment1(data);
      const order = response.data;
      var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: 'rzp_test_6Fsll3myRMs9xe',
        amount: '5000',
        name: 'Acme Corp',
        order_id: order.id,
        prefill: {
          email: 'gaurav.kumar@example.com',
          contact: '9191919191',
          name: 'Gaurav Kumar',
        },
        theme: {color: '#53a20e'},
      };

      RazorpayCheckout.open(options)
        .then(data => {
          checkPayment(data);
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
        text1: `Payment Failed ${error}`,
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
              <Image
                //source={`http://192.168.79.234:5000/upload/${course.courseImg}`}
                style={styles.courseImage}
              />
              <Text style={styles.courseTitle}>{course.coursename}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>${course.courseprice}</Text>
                <Text style={styles.discountedPrice}>
                  ${course.price - course.discount}
                </Text>
                <Text style={styles.discount}>{course.discount}% OFF</Text>
              </View>
              {showAllCourses && (
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
              {showAllCourses ? (
                <Button
                  title="Buy Now"
                  onPress={handlePayment}
                  filled
                  style={{
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                />
              ) : (
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
