import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import Orientation from 'react-native-orientation-locker';

const Lecture = ({route}) => {
  const {course} = route.params;
  const [lecture, setLecture] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoPress = videoId => {
    setSelectedVideo(videoId);
    Orientation.lockToLandscape();
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    Orientation.lockToPortrait();
  };

  const getLecture = async course => {
    try {
      const lectures = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=25&playlistId=${course.playlist}&key=AIzaSyBIGNiQedzXNCzJIX32FluO21TBoJC3sA`,
      );
      //   setLecture(lectures.data.items);
    } catch (error) {
      setLecture([]);
      //console.error('Error fetching lectures:', error);
    }
  };

  useEffect(() => {
    getLecture(course);
  }, [course]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Lectures</Text>
          {lecture.length > 0 ? (
            lecture.map((lectureItem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.lecture}
                onPress={() =>
                  handleVideoPress(lectureItem.contentDetails.videoId)
                }>
                <Text style={styles.lectureTitle}>{`Lecture ${index + 1}: ${
                  lectureItem.snippet.title
                }`}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <>
              <Text
                style={{
                  color: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                No Lecture Found
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      {selectedVideo && (
        <Modal visible={true} transparent={false} animationType="slide">
          <View style={styles.videoContainer}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${selectedVideo}?autoplay=1&fullscreen=1`,
              }}
              style={{flex: 1}}
              allowsFullscreenVideo
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={() => (
                <ActivityIndicator color="#000" size="large" />
              )}
              onError={() => Alert.alert('Error', 'Failed to load video.')}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseVideo}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
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
});

export default Lecture;
