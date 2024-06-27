import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Easing, Dimensions 
} from 'react-native';

const Explore = ({route}) => {
  const {course} = route.params;
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [colorAnim]);
  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#babdb5', '#0f1701'],
  });

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    outputRange: [
      '#f0d173',
      '#337b8f',
      '#5fe884',
      '#7c40f5',
      '#90f0a0',
      '#f0d173',
      '#b05c43',
      '#337b8f',
      '#ff0000',
    ],
  });

  const features = [
    {id: '1', feature: '1 Year Complete Preparation'},
    {id: '2', feature: '240+ Hours of Content'},
    {id: '3', feature: 'Mock Test and Class Test'},
    {id: '4', feature: 'Downloadable Resources'},
    {id: '5', feature: 'Taught By Experties'},
  ];
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownVisible1, setDropdownVisible1] = useState(false);
  const [isDropdownVisible2, setDropdownVisible2] = useState(false);
  const [isDropdownVisible3, setDropdownVisible3] = useState(false);
  const [isDropdownVisible4, setDropdownVisible4] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!isDropdownVisible1);
  };
  const toggleDropdown2 = () => {
    setDropdownVisible2(!isDropdownVisible2);
  };
  const toggleDropdown3 = () => {
    setDropdownVisible3(!isDropdownVisible3);
  };
  const toggleDropdown4 = () => {
    setDropdownVisible4(!isDropdownVisible4);
  };
  const renderFeature = ({item}) => (
    <View style={styles.featureBox}>
      <Text style={styles.featureText}>{item.feature}</Text>
    </View>
  );

  const screenWidth = Dimensions.get('window').width;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    const startAnimation = () => {
      slideAnim.setValue(screenWidth); // Reset the animation to the starting point
      Animated.timing(slideAnim, {
        toValue: -screenWidth, // Move to the left end
        duration: 10000, // Animation duration
        easing: Easing.linear, // Easing function for smooth animation
        useNativeDriver: true, // Use native driver for better performance
      }).start(() => startAnimation()); // Loop the animation
    };

    startAnimation();
  }, [screenWidth, slideAnim]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.courseHeader}>
          <Image
            source={{
              uri: `https://academic-server-native.onrender.com/upload/${course.courseImg}`,
            }}
            style={styles.motivationImage}
          />
          <View style={styles.courseBox12}>
        <Text style={styles.courseName12}>Course name - {course.coursename}</Text>
        <Text style={styles.courseTitle12}>Couse title - {course.coursetitle}</Text>
      </View>
        </View>

        {/* Motivation Section*/}
        <View style={styles.section123}>
      <Animated.View style={[styles.offerButton12, { backgroundColor }]}>
        <Animated.Text
          style={[
            styles.offerText123,
            {
              color: 'black',
              transform: [{ translateX: slideAnim }],
              fontFamily: 'SignikaNegative-VariableFont_wght',
            },
          ]}
        >
        Hurry up offer ending soon ! Enroll Now
        </Animated.Text>
      </Animated.View>
    </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The batch include :</Text>
          <View style={styles.card1}>
            <View style={styles.benefits}>
              <Text style={styles.benefit}>✔️ All plus benefits</Text>
              <Text style={styles.benefit}>✔️ Printed Notes**</Text>
              <Text style={styles.benefit}>✔️ valid {course.courseduration} year</Text>
              <Text style={styles.benefit}>✔️ Mains Q&A practice</Text>
              <Text style={styles.benefit}>✔️ Daily Special Content</Text>
              <Text style={styles.benefit}>✔️ All PLUS Benefits</Text>
            </View>
            <Text style={styles.price}>Starts ₹{course.courseprice} /-</Text>
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features : </Text>
          <FlatList
            data={features}
            renderItem={renderFeature}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuresList}
          />
        </View>
        <Text style={{color: 'black', marginLeft: 15, marginTop: 10,  fontFamily:'Rowdies-Regular',fontSize:18}}>
          Know your Teachers
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.faculty}>
            <View style={styles.container2}>
              {/* Left Section */}
              <View style={styles.leftSection}>
                {course.teacher1 && (
                  <View style={styles.card}>
                    <Image
                      source={require('../assets/baa-profile.jpeg')}
                      style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{course.teacher1}</Text>
                      <Text style={styles.cardText}>
                        Experience: {course.teacher1Exp}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.container2}>
              {/* Left Section */}
              <View style={styles.leftSection}>
                {course.teacher2 && (
                  <View style={styles.card}>
                    <Image
                      source={require('../assets/baa-profile.jpeg')}
                      style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{course.teacher2}</Text>
                      <Text style={styles.cardText}>
                        Experience: {course.teacher2Exp}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Timetable</Text>
          <Text style={styles.teacherName1}>Nothing to Show</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Lectures </Text>
          <Text style={styles.teacherName1}>Nothing to Show</Text>
        </View>

        <View>
          <TouchableOpacity onPress={toggleDropdown} style={styles.arrowButton}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.arrowText}>Who should join this batch?</Text>
              <Text style={styles.arrowText}>▼</Text>
            </View>
            {isDropdownVisible && (
              <View style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  Pursuing graduate or completed Graduate
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleDropdown1}
            style={styles.arrowButton}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.arrowText}>Payment options</Text>
              <Text style={styles.arrowText}>▼</Text>
            </View>
            {isDropdownVisible1 && (
              <View style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  you have to contact to the institute
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleDropdown2}
            style={styles.arrowButton}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.arrowText}>Classes live or recorded?</Text>
              <Text style={styles.arrowText}>▼</Text>
            </View>
          </TouchableOpacity>
          {isDropdownVisible2 && (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                Provide live class and provide the lectures for revision
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={toggleDropdown4}
            style={styles.arrowButton}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.arrowText}>Is Class test available?</Text>
              <Text style={styles.arrowText}>▼</Text>
            </View>
            {isDropdownVisible4 && (
              <View style={styles.dropdown}>
                <Text style={styles.dropdownText}>
                  Every class start before mock test compulsary
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleDropdown3}
            style={styles.arrowButton}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.arrowText}>For any query.</Text>
              <Text style={styles.arrowText}>▼</Text>
            </View>
            {isDropdownVisible3 && (
              <View style={styles.dropdown}>
                <Text style={styles.dropdownText}>Contact us -</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* <View style={styles.card}>
          <Text style={styles.cardTitle}>Hear from Our Students</Text>
          <Image
            source={require('../assets/baa-chandra.jpeg')}
            style={styles.cardImage}
          />

          <Text style={styles.cardText}>
            "This course has been a transformative experience. The content is
            rich and the instructors are top-notch!"
          </Text>
        </View> */}

        <View style={styles.motivationalContainer}>
          <Text style={styles.motivationalText}>
            Unlock your potential with this comprehensive course and take the
            first step towards success!
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Buy Now Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            {' '}
            Price : ₹{course.courseprice} /-{' '}
          </Text>
          <Text style={styles.discountText}>% discount applied</Text>
        </View>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  motivationalContainer: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
  },
  featuresSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  featuresList: {
    paddingVertical: 10,
  },
  featureBox: {
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  featureText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0073e6',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  cardImage: {
    width: '40%',
    height: 120,
    borderRadius: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  motivationalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  faculty: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  courseHeader: {
    padding: 10,
    alignItems: 'center',
  },
  courseImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'column',
  },
  rightSection: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  container2: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingHorizontal: 0,
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  courseTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    padding: 11,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },

  section123: {
    overflow: 'hidden', // Hide text overflow
    width: '100%',
  },
  offerButton12: {
    height: 50,
    justifyContent: 'center',
  },
  offerText123: {
    fontSize: 18,
  },
  section1: {
    padding: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontFamily:'Rowdies-Regular'
  },
  motivationImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  teacherName: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  teacherName1: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
  teacherExperience: {
    fontSize: 14,
    color: '#666',
    color: 'black',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    backgroundColor: '#e1e7f7',
    borderRadius: 10,
    padding: 10,
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    marginRight: 10,
    color: 'black',
     fontFamily:'Rowdies-Regular'
  },
  discountText: {
    fontSize: 18,
    color: 'black',
    color:'green',
    fontFamily:'SignikaNegative-VariableFont_wght'
  },
  buyNowButton: {
    padding: 15,
    backgroundColor: '#ff6347',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container2: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
  },
  rightSection: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  arrowButton: {
    padding: 10,
    backgroundColor: '#D3E8F4',
    borderRadius: 5,
    margin: 8,
  },
  arrowText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Rowdies-Regular',
  },
  dropdown: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  dropdownText: {
    color: '#000',
    fontFamily: 'Rowdies-Light',
  },

  card1: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 1,
        backgroundColor:'#edf1fa'
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00c853',
      },
      titleIconic: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffa000',
      },
      subtitle: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 10,
        color:'black'
      },
      benefits: {
        marginBottom: 10,
        color:'black'
      },
      benefit: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 5,
        color:'black'
      },
      price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        color:'black'
      },
      icon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
      },

      courseBox12: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        alignItems: 'center',
      },
      courseName12: {
        fontSize: 20,
        color: '#333',
        marginBottom: 10,
        fontFamily:'Rowdies-Regular'
      },
      courseTitle12: {
        fontSize: 18,
        color: '#666',
        fontFamily:'Rowdies-Light'
      },
});

export default Explore;
