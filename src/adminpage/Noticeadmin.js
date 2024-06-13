import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchNotice } from "../api/userApi";
import Loader from "../loader/Loader1"

const Noticeadmin = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNoticeData, setFilteredNoticeData] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noticeData, setNoticeData] = useState([]);
  const [loading,setLoading] = useState(false)
  // Fetch notice data on component mount
  useEffect(() => {
    setLoading(true)
    fetchNoticeData();
  }, []);

  // Function to fetch notice data
  const fetchNoticeData = async () => {
    try {
      const response = await fetchNotice();
      setNoticeData(response.data.data);
      setLoading(false)
    } catch (error) {
      console.log("Error fetching notice data:", error);
      setLoading(false)
    }
  };

  // Handle view PDF action
  const handleViewPDF = (pdfName) => {
    navigation.navigate("Pdf View")
  };

  // Handle edit notice action
  const handleEditNotice = (id) => {
    const notice = noticeData.find((item) => item.id === id);
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  // Handle delete notice action
  const handleDeleteNotice = (id) => {
    console.log(`Delete notice with ID: ${id}`);
    const updatedNoticeData = noticeData.filter((item) => item.id !== id);
    setNoticeData(updatedNoticeData);
  };

  // Handle save changes in modal
  const handleSaveChanges = () => {
    // Logic to save changes made in the modal
    console.log("Changes saved:", selectedNotice);
    setModalVisible(false);
  };

  // Filter notice data based on search query
  const filteredData = noticeData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Adjust date format as needed
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View
        style={[styles.searchBar, isInputFocused && styles.searchBarFocused]}
      >
        <TextInput
          style={[
            styles.searchInput,
            isInputFocused && styles.searchInputFocused,
          ]}
          placeholder="Search PDFs by name"
          placeholderTextColor="black"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchNoticeData}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading && <Loader />}

      {/* Notice list */}
      <ScrollView>
        {filteredData.map((item) => (
          <View key={item._id} style={styles.noticeItem}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => handleViewPDF(item.notice)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.date}>{formatDate(item.time)}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.title}>{item.notice}</Text>
            </TouchableOpacity>
            <View style={styles.actionIcons}>
              <TouchableOpacity onPress={() => handleEditNotice(item.id)}>
                <Ionicons name="create-outline" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNotice(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for editing notice */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Edit Notice</Text>
            <TextInput
              style={styles.input}
              placeholder="PDF Name"
              placeholderTextColor="black"
              value={selectedNotice?.title}
              onChangeText={(text) =>
                setSelectedNotice({ ...selectedNotice, title: text })
              }
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveChanges} />
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
    padding: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  searchBarFocused: {
    borderColor: "blue",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: "black",
  },
  searchInputFocused: {
    borderWidth: 1,
    borderColor: "blue",
  },
  searchButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  noticeItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  date: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: "black",
  },
  title: {
    flex: 3, // Adjust flex values as needed for desired layout
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Noticeadmin;
