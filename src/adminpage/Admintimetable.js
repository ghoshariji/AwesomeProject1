import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';
import {fetchTimeTable} from '../api/userApi';
import Loader from "../loader/Loader1"

const Admintimetable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [timetableData, settimeTableData] = useState([]);
  const [loading,setLoading] = useState(false)

  const openEditModal = item => {
    console.log('Opening modal with item:', item);
    setSelectedItem(item);
    setModalVisible(true);
  };

  const saveChanges = () => {
    console.log('Changes saved:', selectedItem);
    setModalVisible(false);
  };

  const fetch = async () => {
    try {
      const data = await fetchTimeTable();
      settimeTableData(data.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('Error' + error);
    }
  };

  useEffect(() => {
    setLoading(true)
    fetch();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {timetableData.map((item, index) => (
          <View key={index} style={styles.dayContainer}>
            <TouchableOpacity
              onPress={() => openEditModal(item)}
              style={styles.editIcon}>
              <Ionicons name="edit" size={20} color="blue" />
            </TouchableOpacity>
            <View style={styles.classContainer}>
              <Text style={styles.title}>Today Class</Text>
              <Text
                style={styles.title1}>{`Class Name: ${item.classname}`}</Text>
              <Text style={styles.title1}>{`Sir: ${item.teacher}`}</Text>
              <Text style={styles.title1}>{`Subject: ${item.subject}`}</Text>
              <Text
                style={styles.title1}>{`Time Start: ${item.timestart}`}</Text>
              <Text style={styles.title1}>{`Time End: ${item.timeend}`}</Text>
            </View>
          </View>
          
        ))}
        {loading &&  <Loader/>}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {selectedItem && (
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={25} color="black" />
                </TouchableOpacity>
                <Text style={{color:'black'}}>Edit Data</Text>
                <TextInput
                  style={styles.input}
                  // value={selectedItem.date}
                  // onChangeText={(text) => setSelectedItem({ ...selectedItem, date: text })}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Save" onPress={saveChanges} />
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title1: {
    color: 'black',
  },
  dayContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classContainer: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  batch: {
    marginTop: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Admintimetable;
