import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Periods = () => {
  // const { course } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Data Found !! 😥</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Periods;
