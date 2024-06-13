import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Resultdetails = ({ route }) => {
    const {exam} = route.params;

    console.log(exam)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Examname</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>data</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>time</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Score:</Text>
          <Text style={styles.value}>10%</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Questions Attempted:</Text>
          <Text style={styles.value}>10</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Questions Not Attempted:</Text>
          <Text style={styles.value}>5</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Marks:</Text>
          <Text style={styles.value}>20</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Marks Obtained:</Text>
          <Text style={styles.value}>5</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});

export default Resultdetails;
