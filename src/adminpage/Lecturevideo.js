import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native";
import Loader from "../loader/Loader1"
import { fetchCourse } from "../api/userApi";

const Lecturevideo = ({ navigation }) => {
  const [loading,setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = courses.filter((course) =>
      course.coursename.toLowerCase().trim().includes(text.toLowerCase().trim())
    );
    setFilteredCourses(filtered);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };
  const [courses,setCourses] = useState([])
  const fetch = async () =>{
    try {
      const data = await fetchCourse()
      setCourses(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetch()
  },[])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate("Add Video",{item})}
    >
      <Text style={styles.courseTitle}>{item.coursename}</Text>
      <TouchableOpacity onPress={() => handleEditCourse(item)}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Courses</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Course"
          value={searchQuery}
          placeholderTextColor="black"
          onChangeText={(text) => handleSearch(text)}
        />
        <Button title="Search" onPress={() => handleSearch(searchQuery)} />
      </View>
      <FlatList
        data={searchQuery ? filteredCourses : courses}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      {
        loading && <Loader />
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Course</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Course Title"
              value={selectedCourse?.title}
              onChangeText={(text) =>
                setSelectedCourse({ ...selectedCourse, title: text })
              }
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={() => setModalVisible(false)} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#ffffff", 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color:'black'
  },
  courseItem: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 16,
    flex: 1,
    color:'black'
  },
  editButton: {
    color: "blue",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color:'black'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Lecturevideo;
