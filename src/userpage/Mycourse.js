import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  BackHandler,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import ToastManager, {Toast} from 'toastify-react-native';
import axios from 'axios';
import Button from '../componets/Button';
import {color} from 'react-native-elements/dist/helpers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Periods from './Periods';
import PagerView from 'react-native-pager-view';
import {NavigationContainer} from '@react-navigation/native';
import Lecture from './Lecture';
const Mycourse = ({route, navigation}) => {
  const {course} = route.params;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showExamModal, setShowExamModal] = useState(false);
  const Tab = createMaterialTopTabNavigator();
  useEffect(() => {
    const backAction = () => {
      if (selectedVideo) {
        setSelectedVideo(null);
        Orientation.lockToPortrait();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedVideo]);


 


  const handleExamPress = () => {
    Toast.success('Not Found');
  };

  const handleCloseExamModal = () => {
    setShowExamModal(false);
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          {course.courseImg && (
            <Image
              source={{
                uri: `https://academic-server-native.onrender.com/upload/${course.courseImg}`,
              }}
              style={styles.courseImage}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.sectionTitle}>Course Description</Text>
          </View>

          <Text style={styles.description}>{course.coursetitle}</Text>
        </View>

        {/* making here the topMaterialNavigator */}
          <Tab.Navigator>
            <Tab.Screen name="Class" component={Lecture} initialParams={{course}}/>
            <Tab.Screen name="Schedule" component={Periods} />
            <Tab.Screen name="Exam" component={Periods} />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
          </Tab.Navigator>


        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exams</Text>
          <TouchableOpacity
            style={styles.takeQuizButton}
            onPress={handleExamPress}>
            <Text style={styles.takeQuizText}>Take Quiz</Text>
          </TouchableOpacity>
        </View> */}
       
      </ScrollView>
    
      <Modal
        visible={showExamModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseExamModal}>
        {/* <View style={styles.examModalContainer}>
          <View style={styles.examModalContent}>
            <Text style={styles.examModalTitle}>Choose an Exam</Text>
            {course.exams.map((exam, index) => (
              <TouchableOpacity
                key={index}
                style={styles.examOption}
                onPress={() => {
                  handleCloseExamModal();
                  navigation.navigate("Write-Exam", { exam });
                }}
              >
                <Text style={styles.examOptionText}>{exam.examname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  courseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#000',
  },
  lecture: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  lectureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  takeQuizButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  takeQuizText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  examModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  examModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  examModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  examOption: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  examOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Mycourse;
