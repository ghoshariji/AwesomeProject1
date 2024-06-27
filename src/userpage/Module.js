import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const demoPDFs = [
  { id: '1', name: 'Sample PDF 1', date: '2023-06-01', url: 'http://www.pdf995.com/samples/pdf.pdf' },
  { id: '2', name: 'Sample PDF 2', date: '2023-06-02', url: 'http://www.pdf995.com/samples/pdf.pdf' },
  { id: '3', name: 'Sample PDF 3', date: '2023-06-03', url: 'http://www.pdf995.com/samples/pdf.pdf' },
];

const Module = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const normalizeString = (str) => str.toLowerCase().trim();
  const filteredPDFs = demoPDFs.filter((pdf) =>
    normalizeString(pdf.name).includes(normalizeString(searchQuery))
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Search PDFs</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="gray"
        />
      </View>

      <View style={styles.pdfListContainer}>
        {filteredPDFs.map((pdf) => (
          <View key={pdf.id} style={styles.pdfContainer}>
            <View style={styles.pdfDetails}>
              <Text style={styles.pdfName}>{pdf.name}</Text>
              <Text style={styles.pdfDate}>{pdf.date}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate("Pdf View")}>
              <Text style={styles.viewButtonText}>View PDF</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#FFF',
    color: 'black',
  },
  pdfListContainer: {
    marginTop: 20,
  },
  pdfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pdfDetails: {
    flex: 1,
  },
  pdfName: {
    fontSize: 16,
    color: 'black',
  },
  pdfDate: {
    fontSize: 14,
    color: 'gray',
  },
  viewButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  pdfViewerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Module;
