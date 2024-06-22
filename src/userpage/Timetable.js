import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fetchTimeTable } from "../api/userApi";
import Loader from "../loader/Loader1";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      const data = await fetchTimeTable(); // Fetch timetable data
      setTimetable(data.data); // Update timetable state
      setLoading(false); // Set loading state to false
    } catch (error) {
      setLoading(false); // Set loading state to false on error
      console.error("Error fetching timetable:", error);
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true on component mount
    fetch(); // Fetch timetable data
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Display loader while loading */}
        {loading && <Loader />}

        {/* Render timetable data */}
        {timetable.map((classItem, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.date}>Tuesday, June 26</Text>
              <View style={styles.classContainer}>
                <View style={styles.classHeader}>
                  <Ionicons name="school-outline" size={24} color="#333" style={styles.icon} />
                  <Text style={styles.detail}>{`Subject: ${classItem.subject}`}</Text>
                </View>
                <Text style={styles.detail}>{`Teacher: ${classItem.teacher}`}</Text>
                <Text style={styles.detail}>{`Class Name: ${classItem.classname}`}</Text>
                <Text style={styles.detail}>{`Start Time: ${classItem.timestart}`}</Text>
                <Text style={styles.detail}>{`End Time: ${classItem.timeend}`}</Text>
              </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  dayContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  classContainer: {
    marginBottom: 15,
  },
  classHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  detail: {
    color: "#555",
  },
});

export default Timetable;
