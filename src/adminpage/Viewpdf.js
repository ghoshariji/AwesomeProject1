import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Pdf from 'react-native-pdf';

const Viewpdf = ({ route }) => {
 // const { item } = route.params;
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const handleError = (error) => {
    setLoading(false);
    Alert.alert('Error', 'Failed to load PDF. Please try again later.');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color="black"
          size="large"
        />
      )}
      <Pdf
        trustAllCerts={false}
        source={{
          // uri: `https://academic-server-native.onrender.com/pdf/${item}`,
          uri:"https://icseindia.org/document/sample.pdf"
        }}
        style={styles.pdf}
        onLoadComplete={handleLoadComplete}
        onError={handleError}
        spacing={10}
        scale={1.0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  pdf: {
    flex: 1,
  },
});

export default Viewpdf;
