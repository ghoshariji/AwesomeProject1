import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fetchTimeTable } from "../api/userApi";

const Timetable = () => {
  const [timetable, settimetable] = useState([]);

  const fetch = async () => {
    try {
      const data = await fetchTimeTable();
      settimetable(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {timetable.map((item, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.classContainer}>
              <Text style={styles.title}>Class 1:</Text>
              <Text style={{color:'black'}}>{`Sir: ${item.teacher}`}</Text>
              <Text style={{color:'black'}}>{`Subject: ${item.subject}`}</Text>
              <Text style={{color:'black'}}>{`Classname: ${item.classname}`}</Text>
              <Text style={{color:'black'}}>{`Start Time: ${item.timestart}`}</Text>
              <Text style={{color:'black'}}>{`End Time: ${item.timeend}`}</Text>
            </View>
            {/* <View style={styles.classContainer}>
            <Text style={styles.title}>Class 2:</Text>
            <Text>{`Sir: ${item.class2.sir}`}</Text>
            <Text>{`Subject: ${item.class2.subject}`}</Text>
            <Text>{`Time: ${item.class2.time}`}</Text>
          </View> */}
            {/* <Text style={styles.batch}>{`Batch: ${item.batch}`}</Text> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dayContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  classContainer: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    color:'black'
  },
  batch: {
    marginTop: 10,
  },
});

export default Timetable;
