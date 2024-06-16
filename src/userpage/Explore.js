import React, { useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Animated, TouchableOpacity,FlatList } from 'react-native';

const Explore = ({ route }) => {
  const { course } = route.params;
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
      ])
    ).start();
  }, [colorAnim]);
  const textColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#babdb5', '#0f1701'],
  });

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    outputRange: ['#f0d173', '#337b8f', '#5fe884', '#7c40f5', '#90f0a0', '#f0d173', '#b05c43', '#337b8f', '#ff0000'],
  });



  const features = [
    { id: '1', feature: '1 Year Complete Preparation' },
    { id: '2', feature: '240+ Hours of Content' },
    { id: '3', feature: 'Mock Test and Class Test' },
    { id: '4', feature: 'Downloadable Resources' },
    { id: '5', feature: 'Taught By Experties' },
  ];

  const renderFeature = ({ item }) => (
    <View style={styles.featureBox}>
      <Text style={styles.featureText}>{item.feature}</Text>
    </View>
  );

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
          <Text style={styles.courseTitle}>Course - {course.coursename}</Text>
          <Text style={styles.courseTitle}>{course.coursetitle}</Text>
        </View>

        {/* Motivation Section*/}
        <View style={styles.section}>
          {/* Highlighted Tag Offer Button */}
          <Animated.View style={[styles.offerButton, { backgroundColor }]}>
        <Animated.Text style={[styles.offerText, { color: textColor }]}>
          Hurry Up! Offer Ending Soon
        </Animated.Text>
      </Animated.View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Description</Text>
          <Text style={styles.teacherName}>
            Course Valid till {course.courseduration} year from the purchase Date
          </Text>
          <Text style={styles.teacherExperience}>
            Price : ₹{course.courseprice} /-{' '}
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features : </Text>
          <FlatList
            data={features}
            renderItem={renderFeature}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuresList}
          />
        </View>

        <View style={styles.faculty}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
              marginLeft: 20,
              marginTop: 5,
            }}>
            Know your Teachers
          </Text>
          <View style={styles.container2}>
            {/* Left Section */}
            <View style={styles.leftSection}>
              {course.teacher1 ? (
                <View style={styles.section1}>
                  <Text style={styles.sectionTitle}>Teacher 1</Text>
                  <Text style={styles.teacherName}>{course.teacher1}</Text>
                  <Text style={styles.teacherExperience}>
                    Experience: {course.teacher1Exp}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
              <Image
                source={require('../assets/baa-profile.jpeg')}
                style={styles.circularImage}
              />
            </View>
          </View>

          <View style={styles.container2}>
            {/* Left Section */}
            <View style={styles.leftSection}>
              {course.teacher2 ? (
                <View style={styles.section1}>
                  <Text style={styles.sectionTitle}>Teacher 2</Text>
                  <Text style={styles.teacherName}>{course.teacher2}</Text>
                  <Text style={styles.teacherExperience}>
                    Experience: {course.teacher2Exp}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Right Section */}
            <View style={styles.rightSection}>
              <Image
                source={require('../assets/baa-profile.jpeg')}
                style={styles.circularImage}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Timetable</Text>
          <Text style={styles.teacherName1}>Nothing to Show</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Lectures </Text>
          <Text style={styles.teacherName1}>Nothing to Show</Text>
        </View>

        <View style={styles.card}>
        <Text style={styles.cardTitle}>Hear from Our Students</Text>
          <Image
            source={require('../assets/baa-chandra.jpeg')}
            style={styles.cardImage}
          />
          
          <Text style={styles.cardText}>
            "This course has been a transformative experience. The content is rich and the instructors are top-notch!"
          </Text>
        </View>

        <View style={styles.motivationalContainer}>
        <Text style={styles.motivationalText}>Unlock your potential with this comprehensive course and take the first step towards success!</Text>
      </View>
      </ScrollView>

      {/* Fixed Buy Now Button */}
      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>
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
  offerButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginTop: 10,
  },
  offerText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  motivationalContainer: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    marginTop:10,
    width:'90%',
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
    shadowOffset: { width: 0, height: 2 },
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
    marginVertical: 20,
    paddingHorizontal: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  section1: {
    padding: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
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
  buyNowButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
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
});

export default Explore;
