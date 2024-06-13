import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Allresult = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([
    { id: 1, name: 'John Doe', marks: 85, examName: 'Maths' },
    { id: 2, name: 'Jane Smith', marks: 78, examName: 'Science' },
    { id: 3, name: 'Alice Johnson', marks: 92, examName: 'English' },
    // Add more data as needed
  ]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Initially, display all results
    setFilteredResults(results);
  }, []);

  const handleSearch = (text) => {
    // Update the search query
    setSearchQuery(text);
    
    // Filter the results based on the search query
    const filtered = results.filter(result =>
      result.name.toLowerCase().includes(text.toLowerCase())
    );
    // Update the state with the filtered results
    setFilteredResults(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <ScrollView>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Marks</Text>
          <Text style={styles.headerText}>Exam Name</Text>
        </View>
        {filteredResults.map(result => (
          <TouchableOpacity key={result.id} style={styles.tableRow}>
            <Text style={styles.rowText}>{result.name}</Text>
            <Text style={styles.rowText}>{result.marks}</Text>
            <Text style={styles.rowText}>{result.examName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});

export default Allresult;
