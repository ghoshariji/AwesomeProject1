import React from 'react';
import { View, StyleSheet,ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

const Viewpdf = () => {
  return (
     <Pdf
          trustAllCerts={false}
          source={{
            uri: 'https://icseindia.org/document/sample.pdf',
          }}
          style={{flex: 1}}
          spacing={10}
          scale={1.0}
          renderActivityIndicator={() => (
            <ActivityIndicator color="black" size="large" />
          )}
        />
  );
};
export default Viewpdf;
