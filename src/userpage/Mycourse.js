import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Modal, BackHandler, StyleSheet } from "react-native";
import WatchLecture from "./WatchLecture";
import Orientation from "react-native-orientation-locker";

const Mycourse = ({ route, navigation }) => {
  const { course } = route.params;
  console.log(course.lectures)
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showExamModal, setShowExamModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (selectedVideo) {
        setSelectedVideo(null);
        Orientation.lockToPortrait();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [selectedVideo]);

  const handleVideoPress = (videoUri) => {
    setSelectedVideo(videoUri);
    Orientation.lockToLandscape();
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    Orientation.lockToPortrait();
  };

  const handleExamPress = () => {
    setShowExamModal(true);
  };

  const handleCloseExamModal = () => {
    setShowExamModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Description</Text>
          <Text style={styles.description}>{course.coursetitle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exams</Text>
          <TouchableOpacity style={styles.takeQuizButton} onPress={handleExamPress}>
            <Text style={styles.takeQuizText}>Take Quiz</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Video Lectures</Text>
          {course.lectures.length > 0 ? ( course.lectures.map((lecture, index) => (
            <TouchableOpacity
              key={index}
              style={styles.lecture}
              onPress={() => handleVideoPress(lecture.video)}
            >
              <Text style={styles.lectureTitle}>{`Lecture ${index + 1}: ${lecture.title}`}</Text>
              <Text style={styles.lectureDescription}>{lecture.description}</Text>
            </TouchableOpacity>
          ))):
          (
            <Text>No Lecture Found</Text>
          )
        
        }
        </View>
      </ScrollView>

      {selectedVideo && (
        <Modal visible={true} transparent={true} animationType="slide">
          <WatchLecture lectureUri={selectedVideo} onClose={handleCloseVideo} />
        </Modal>
      )}

      <Modal
        visible={showExamModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseExamModal}
      >
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
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#000",
  },
  lecture: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  lectureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  lectureDescription: {
    fontSize: 16,
    color: "#666",
  },
  takeQuizButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  takeQuizText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  examModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  examModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  examModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  examOption: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  examOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Mycourse;
