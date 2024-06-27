import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  handleAddCourse1,
  handleNoticeSubmit1,
  handleTimeTable1,
} from '../api/adminApi';
import Loader from '../loader/Loader2';
import Toast from 'react-native-toast-message';
const Adminhome = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addImageModalVisible, setAddImageModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [timetablemodal, settimetableModal] = useState(false);
  const [noticeModal, setNoticeModal] = useState(false);
  const [instituteqaModal, setInstituteqaModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState({
    coursename: '',
    coursetitle: '',
    courseprice: '',
    courseduration: '',
    teacher1: '',
    teacher2: '',
    teacher1Exp: '',
    teacher2Exp: '',
    courseImg: null,
    playlist:''
  });

  const [timetable, setTimetable] = useState({
    classname: '',
    teacher: '',
    subject: '',
    timestart: '',
    timeend: '',
  });

  const handleTimeTable = (name, value) => {
    setTimetable({...timetable, [name]: value});
  };

  const handleInput = (name, value) => {
    setPost({...post, [name]: value});
  };

  const handleAddImage = async () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (!response.didCancel) {
        setImage(response.assets[0]);
      }
      setAddImageModalVisible(false);
    });
  };
  const handleAddImageCourse = async () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (!response.didCancel) {
        setPost({...post, courseImg: response.assets[0]});
      }
      setAddImageModalVisible(false);
    });
  };
  const handleAddCourse = () => {
    setModalVisible(true);
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    setModalVisible(false);
    try {
      const formData = new FormData();
      formData.append('coursename', post.coursename);
      formData.append('coursetitle', post.coursetitle);
      formData.append('courseprice', post.courseprice);
      formData.append('courseduration', post.courseduration);
      formData.append('teacher1', post.teacher1);
      formData.append('teacher2', post.teacher2);
      formData.append('teacher1Exp', post.teacher1Exp);
      formData.append('teacher2Exp', post.teacher2Exp);

      if (post.courseImg) {
        formData.append('courseImg', {
          uri: post.courseImg.uri,
          name: post.courseImg.fileName || 'photo.jpg',
          type: post.courseImg.mimeType || 'image/jpeg',
        });
      }
      const response = await handleAddCourse1(formData);
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Course Added Successfully',
          position: 'bottom',
        });
      }
      setLoading(false);
      setPost('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
        position: 'bottom',
      });
    }
  };

  const submitImage = () => {
    setAddImageModalVisible(false);
  };

  const submitTimeTable = async e => {
    e.preventDefault();
    setLoading(true);
    settimetableModal(false);
    try {
      console.log(timetable);
      const data = await handleTimeTable1(timetable);
      if (data.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Time table Added',
          position: 'bottom',
        });
      }
      setLoading(false);
      setTimetable("")
    } catch (error) {
      settimetableModal(false);
      setLoading(false);
      console.log('Error ' + error);
      setTimetable("")
      Toast.show({
        type: 'error',
        text1: 'Something went Wrong',
        position: 'bottom',
      });
    }
  };
  const [notice1, setNotice] = useState({
    title: '',
    notice: null,
  });
  const handleOpenFilePicker = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setNotice({...notice1, notice: file[0]});
    } catch (error) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled')
        } else {
        throw err;
        }
    }
  };
  const handleNotice = (name, value) => {
    setNotice({...notice1, [name]: value});
  };

  const handleNoticeSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', notice1.title);
      if (notice1.notice) {
        const uri = notice1.notice;
        formData.append('notice', {
          uri: uri.uri,
          name: uri.name,
          type: 'application/pdf',
        });
      }
      setNoticeModal(false);
      setLoading(false)
      const data = await handleNoticeSubmit1(formData);
      if (data.data.success) {
        setLoading(false);
        setNotice("")
        Toast.show({
          type: 'success',
          text1: 'Notice Uploaded Successfully',
          position: 'bottom',
        });
      }
      else{
        setNotice("")
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Network error...',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      setNoticeModal(false);
      setNotice("")
      Toast.show({
        type: 'error',
        text1: 'Something went Wrong',
        position: 'bottom',
      });
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    // Add your search logic here
    // console.log("Searching for:", text);
  };

  // for the institute question and answer

  const [insQues, setInsQues] = useState({
    title: '',
    quesans: null,
  });
  const handleInsFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setInsQues({...insQues, quesans: file[0]});
    } catch (error) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled')
        } else {
        throw err;
        }
    }
  };
  const handleInsQues = (name, value) => {
    setInsQues({...insQues, [name]: value});
  };

  const handleInsQuesSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', insQues.title);
      if (insQues.quesans) {
        const uri = insQues.quesans;
        formData.append('quesans', {
          uri: uri.uri,
          name: uri.name,
          type: 'application/pdf',
        });
      }
      console.log(formData)
      setNoticeModal(false);
      setLoading(false)
      // const data = await handleInsQuesAns(formData);
      // if (data.data.success) {
      //   setLoading(false);
      //   setNotice("")
      //   Toast.show({
      //     type: 'success',
      //     text1: 'Notice Uploaded Successfully',
      //     position: 'bottom',
      //   });
      // }
      // else{
      //   setNotice("")
      //   setLoading(false)
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Network error...',
      //     position: 'bottom',
      //   });
      // }
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      setNoticeModal(false);
      setNotice("")
      Toast.show({
        type: 'error',
        text1: 'Something went Wrong',
        position: 'bottom',
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchQuery}
          placeholderTextColor="black"
        />
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcons name="search" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setAddImageModalVisible(true)}>
        <Text style={styles.cardText}>Upload Image For Home page</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleAddCourse}>
        {/* <View style={styles.cardContent}> */}
        <Text style={styles.cardText}>Add Course</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
        {/* </View> */}
      </TouchableOpacity>

      {loading && <Loader />}

      <TouchableOpacity
        style={styles.card}
        onPress={() => settimetableModal(true)}>
        <Text style={styles.cardText}>Upload Time Table</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setNoticeModal(true)}>
        <Text style={styles.cardText}>Upload Notice</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setInstituteqaModal(true)}>
        <Text style={styles.cardText}>Institute Question & Answer </Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </TouchableOpacity>

      <Toast />

      <Modal
        animationType="slide"
        transparent={true}
        visible={addImageModalVisible}
        onRequestClose={() => setAddImageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={[styles.closeButton, {backgroundColor: 'red'}]}
            onPress={() => setAddImageModalVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {/* <TextInput type="file" /> */}
            <TouchableOpacity
              style={styles.selectImageButton}
              onPress={handleAddImage}>
              <MaterialIcons name="add-a-photo" size={24} color="white" />
              <Text style={styles.selectImageText}>Select Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, {backgroundColor: 'green'}]}
              onPress={() => {
                submitImage;
              }}>
              <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.closeButton, {backgroundColor: 'red'}]} // Red close button
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  value={post.name}
                  placeholder="Enter Course name*"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('coursename', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.title}
                  placeholder="Enter Course title*"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('coursetitle', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.price}
                  placeholder="Enter Course Price* (eg:100rs)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('courseprice', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.duration}
                  placeholder="Enter Course Duration* (eg:1)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('courseduration', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.playlist}
                  placeholder="Enter YouTube Playlist Id* (eg:Nxdfskfds)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('playlist', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.teacher1}
                  placeholder="Enter Teacher1 Name (optional)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('teacher1', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.teacher2}
                  placeholder="Enter Teacher2 Name(optional)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('teacher2', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.teacher1Exp}
                  placeholder="Enter Teacher1 Experience (optional)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('teacher1Exp', e)}
                />
                <TextInput
                  style={styles.input}
                  value={post.teacher2Exp}
                  placeholder="Enter Teacher2 Experience (optional)"
                  placeholderTextColor="black"
                  onChangeText={e => handleInput('teacher2Exp', e)}
                />
                <TouchableOpacity
                  style={styles.selectImageButton}
                  onPress={handleAddImageCourse}>
                  <MaterialIcons name="add-a-photo" size={24} color="white" />
                  <Text style={styles.selectImageText}>Select Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, {backgroundColor: 'green'}]} // Green save button
                  onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={timetablemodal}
        onRequestClose={() => settimetableModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView1}>
            <TouchableOpacity
              style={[styles.closeButton, {backgroundColor: 'red'}]}
              onPress={() => settimetableModal(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  value={timetable.classname}
                  placeholder="Enter Batch name or ClassName*"
                  placeholderTextColor="black"
                  onChangeText={e => handleTimeTable('classname', e)}
                />
                <TextInput
                  style={styles.input}
                  value={timetable.teacher}
                  placeholder="Enter Teacher name*"
                  placeholderTextColor="black"
                  onChangeText={e => handleTimeTable('teacher', e)}
                />
                <TextInput
                  style={styles.input}
                  value={timetable.subject}
                  placeholder="Enter Subject name*"
                  placeholderTextColor="black"
                  onChangeText={e => handleTimeTable('subject', e)}
                />
                <TextInput
                  style={styles.input}
                  value={timetable.starttime}
                  placeholder="Enter start time of the class*"
                  placeholderTextColor="black"
                  onChangeText={e => handleTimeTable('timestart', e)}
                />
                <TextInput
                  style={styles.input}
                  value={timetable.endtime}
                  placeholder="Enter end time of the class*"
                  placeholderTextColor="black"
                  onChangeText={e => handleTimeTable('timeend', e)}
                />
                <TouchableOpacity
                  style={[styles.submitButton, {backgroundColor: 'green'}]} // Green save button
                  onPress={submitTimeTable}>
                  <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={noticeModal}
        onRequestClose={() => setNoticeModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              style={[styles.closeButton, {backgroundColor: 'red'}]} // Red close button
              onPress={() => setNoticeModal(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent1}>
                <TextInput
                  style={styles.input}
                  value={notice1.title}
                  placeholder="Enter title of the PDF*"
                  placeholderTextColor="black"
                  onChangeText={e => handleNotice('title', e)}
                />
                <TouchableOpacity onPress={handleOpenFilePicker}>
                  <View style={styles.selectFileButton}>
                    <MaterialIcons name="attach-file" size={24} color="black" />
                    <Text style={styles.selectFileText}>
                      Click here to select PDF*
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* Display selected file */}
                {notice1.notice && (
                  <View style={styles.selectedFileContainer}>
                    <MaterialIcons name="description" size={24} color="black" />
                    <Text
                      style={
                        styles.selectedFileName
                      }>{`Selected File: ${notice1.notice.name}`}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[styles.submitButton, {backgroundColor: 'green'}]} // Green save button
                  onPress={handleNoticeSubmit}>
                  <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>


{/* upload institute pdf */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={instituteqaModal}
        onRequestClose={() => setInstituteqaModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView2}>
            <TouchableOpacity
              style={[styles.closeButton, {backgroundColor: 'red'}]} // Red close button
              onPress={() => setInstituteqaModal(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View style={styles.modalContent1}>
                <TextInput
                  style={styles.input}
                  value={insQues.title}
                  placeholder="Enter title of the PDF*"
                  placeholderTextColor="black"
                  onChangeText={e => handleInsQues('title', e)}
                />
                <TouchableOpacity onPress={handleInsFile}>
                  <View style={styles.selectFileButton}>
                    <MaterialIcons name="attach-file" size={24} color="black" />
                    <Text style={styles.selectFileText}>
                      ENter the Pdf title*
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* Display selected file */}
                {insQues.quesans && (
                  <View style={styles.selectedFileContainer}>
                    <MaterialIcons name="description" size={24} color="black" />
                    <Text
                      style={
                        styles.selectedFileName
                      }>{`Selected File: ${insQues.quesans.name}`}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[styles.submitButton, {backgroundColor: 'green'}]} // Green save button
                  onPress={handleInsQuesSubmit}>
                  <Text style={styles.submitButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
  },
  selectImageButton: {
    backgroundColor: '#007AFF', // Blue color for iOS style
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectImageText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    color: 'black',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  arrow: {
    fontSize: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    padding: 2,
  },
  submitButton: {
    backgroundColor: 'blue', // Default color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#555',
  },

  selectFileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectFileText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black', // Adjust the color as needed
  },

  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
  },

  selectedFileName: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black', // Adjust the color as needed
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  modalView1: {
    width: '90%',
    height: '65%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  modalView2: {
    width: '90%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 100,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalContent1: {
    alignItems: 'center',
    padding: 3,
    margin: 3,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    padding: 4,
    margin: 5,
    color: 'black',
  },
  selectImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectImageText: {
    color: 'white',
    marginLeft: 5,
  },
  submitButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Adminhome;
