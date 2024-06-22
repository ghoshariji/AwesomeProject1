import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccessDenied = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚫</Text>
      <Text style={styles.text}>Oops! Access Denied</Text>
      <Text style={styles.message}>It looks like you don't have permission to access this page. Don't worry, it's not a problem! Please check with support if you think this is a mistake.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', 
    padding: 20,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4500', 
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default AccessDenied;
