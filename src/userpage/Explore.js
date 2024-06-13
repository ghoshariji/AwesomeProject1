import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';

const Explore = ({route}) => {
  const {course} = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.courseHeader}>
        {/* <Image
          source={`http://192.168.175.58:5000/upload/${course.courseImg}`} 
          style={styles.courseImage}
        /> */}
        <Text style={styles.courseTitle}>Course Title</Text>
      </View>

      {/* Motivation Section */}
      <View style={styles.section}>
        {/* <Image
           source={`http://192.168.175.58:5000/upload/${course.courseImg}`} 
          style={styles.motivationImage}
        /> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Description</Text>
        <Text style={styles.teacherName}>
          Duration : {course.courseduration} year
        </Text>
        <Text style={styles.teacherExperience}>Price:{course.courseprice}</Text>
      </View>
      {course.teacher1 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teacher</Text>
          <Text style={styles.teacherName}>{course.teacher1}</Text>
          <Text style={styles.teacherExperience}>
            Experience:{course.teacher1Exp}
          </Text>
        </View>
      ) : null}

      {course.teacher2 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teacher</Text>
          <Text style={styles.teacherName}>{course.teacher2}</Text>
          <Text style={styles.teacherExperience}>
            Experience:{course.teacher2Exp}
          </Text>
        </View>
      ) : null}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Timetable</Text>
        <Text style={styles.teacherName}>Nothing to Show</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  courseHeader: {
    padding: 20,
    alignItems: 'center',
  },
  courseImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  teacherExperience: {
    fontSize: 14,
    color: '#666',
    color: 'black',
  },
});

export default Explore;
