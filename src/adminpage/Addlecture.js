import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {handleAddLecture} from '../api/adminApi';
import Toast from 'react-native-toast-message';
import Loader from "../loader/Loader2"

const Addlecture = ({route}) => {
  const {item} = route.params;
  const [videos, setVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [id, setId] = useState('');
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (item) {
      setVideos(item.lectures);
      setId(item._id);
    }
    setLoading(false)
  }, []);
  const uploadVideo = () => {
    ImagePicker.launchImageLibrary({mediaType: 'video'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setPost({...post, video: response.assets[0]});
      }
    });
  };

  const [post, setPost] = useState({
    title: '',
    lecturename: '',
    lectureabout: '',
    video: null,
  });

  const handleInput = (name, val) => {
    setPost({...post, [name]: val});
  };

  const saveVideo = async e => {
    setLoading(true)
    e.preventDefault();
    if (
      !post.title ||
      !post.lecturename ||
      !post.lectureabout ||
      !post.video
    ) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required!',
      });
      setLoading(false)
      return;
    }
    try {
      const formData = new FormData();
      formData.append('courseId',id);
      formData.append('title', post.title);
      formData.append('lecturename', post.lecturename);
      formData.append('lectureabout', post.lectureabout);

      if (post.video) {
        formData.append('video', {
          uri: post.video.uri,
          type: post.video.type,
          name: post.video.fileName,
        });
      }
      const data = await handleAddLecture(formData);
      if(data.success)
        {
          setPost({
            title: '',
            lecturename: '',
            lectureabout: '',
            video: null,
          });
          Toast.show({
            type: 'success',
            text1: "Submitted Successfully",
          });
        }
      setModalVisible(false);
      setLoading(false)
    } catch (error) {
      setPost({
        title: '',
        lecturename: '',
        lectureabout: '',
        video: null,
      });
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
      });
      setModalVisible(false);
      setLoading(false)
    }
  };

  const handleDelete = () => {
    setEditModalVisible(false);
  };
  const openEditModal = index => {
    setSelectedVideoIndex(index);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Course Details</Text>
      </View>

      <ScrollView style={styles.videoList}>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <View key={index} style={styles.videoItem}>
              <Text style={styles.videoText}>{video.title}</Text>
              <TouchableOpacity onPress={() => openEditModal(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Text style={styles.editButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.videoText}>No Video Uploaded yet!</Text>
        )}
      </ScrollView>

      <Toast />
      {loading && <Loader/>}

      <View style={styles.uploadButton}>
        <Button
          title="Upload New Video"
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Add/Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible || editModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter the Title of the Video*"
              value={post.title}
              placeholderTextColor="black"
              onChangeText={text => handleInput('title', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter the Lecture Name*"
              value={post.lecturename}
              placeholderTextColor="black"
              onChangeText={text => handleInput('lecturename', text)}
            />
            <TextInput
              style={[styles.input, styles.largeInput]}
              placeholder="Enter the Lecture About*"
              multiline
              value={post.lectureabout}
              placeholderTextColor="black"
              onChangeText={text => handleInput('lectureabout', text)}
            />
            <TouchableOpacity
              style={[
                styles.uploadButtonModal,
                {flexDirection: 'row', alignItems: 'center'},
              ]}
              onPress={uploadVideo}>
              <Text style={styles.buttonText}>
                Upload New Video Click here*
              </Text>
            </TouchableOpacity>
            {post.video ? (
              <Text style={styles.videoNameText}>
                Selected Video: {post.video.fileName}
              </Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setEditModalVisible(false);
                }}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveVideo}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginTop: 3,
  },
  header: {
    marginBottom: 20,
  },
  videoNameText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  videoList: {
    flex: 1,
    marginBottom: 20,
  },
  videoItem: {
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoText: {
    fontSize: 16,
    color: 'black',
  },
  editButton: {
    color: 'blue',
  },
  uploadButton: {
    marginBottom: 20,
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
    width: width - 40, // Adjusted width
    maxHeight: 400, // Max height for modal content
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  largeInput: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Addlecture;
