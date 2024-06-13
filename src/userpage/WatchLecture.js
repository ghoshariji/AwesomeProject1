import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import { Slider } from "react-native-elements";
import Orientation from "react-native-orientation-locker";

const WatchLecture = ({ lectureUri = "", onClose = () => {} }) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const skipForward = () => {
    videoRef.current.seek(currentTime + 10);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 10);
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.currentTime);
  };

  const handleLoad = (meta) => {
    setDuration(meta.duration);
  };

  const handleSlideComplete = (value) => {
    videoRef.current.seek(value);
  };

  const handleEnd = () => {
    Orientation.lockToPortrait();
    onClose();
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <TouchableOpacity onPress={toggleControls} activeOpacity={1} style={styles.container}>
      {lectureUri ? (
        <Video
          ref={videoRef}
          source={{ uri: lectureUri }}
          style={styles.video}
          resizeMode="contain"
          paused={paused}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onEnd={handleEnd}
          useNativeControls={false}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No video available</Text>
        </View>
      )}
      {showControls && (
        <View style={styles.controls}>
          <Slider
            value={currentTime}
            minimumValue={0}
            maximumValue={duration}
            onSlidingComplete={handleSlideComplete}
            style={styles.slider}
          />
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={skipBackward} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>-10s</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaused(!paused)} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>{paused ? "Play" : "Pause"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipForward} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>+10s</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    flex: 1,
    width: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#fff",
  },
  controls: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  controlButton: {
    marginHorizontal: 10,
    padding: 10,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  slider: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default WatchLecture;
