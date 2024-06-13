import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchNotice} from '../api/userApi';
import Loader from '../loader/Loader1';
import Viewpdf from '../adminpage/Viewpdf';

const Notice = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNoticeData, setFilteredNoticeData] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleViewPDF = item => {
    navigation.navigate("Pdf View")
  };
  const [notice, setNotice] = useState([]);
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredNoticeData([]);
    } else {
      const filteredData = notice.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredNoticeData(filteredData);
    }
  };

  const fetch = async () => {
    try {
      const data = await fetchNotice();
      console.log(data.data.data);
      setNotice(data.data.data);
      setLoading(false);
      setFilteredNoticeData(data.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    fetch();
  }, []);

  const formatDate = dateString => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Format the date as needed
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.searchBar, isInputFocused && styles.searchBarFocused]}>
        <TextInput
          style={[
            styles.searchInput,
            isInputFocused && styles.searchInputFocused,
            {color: 'black'},
          ]}
          placeholder="Search PDFs by name"
          placeholderTextColor="grey"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          //   onFocus={() => setIsInputFocused(true)}
          //   onBlur={() => setIsInputFocused(false)}
          //   onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {loading && <Loader />}
      <ScrollView>
        {filteredNoticeData ? (
          filteredNoticeData.map(item => (
            <TouchableOpacity
              key={item._id}
              style={styles.noticeItem}
              onPress={() => handleViewPDF(item)}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.date}>{formatDate(item.time)}</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.date}>{item.title}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name={item.icon}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Text style={styles.pdfName}>{item.notice}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.date}>Not Found ....</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  searchBarFocused: {
    borderColor: 'blue', // Change border color when input is focused
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchInputFocused: {
    // Add additional styles when input is focused
    borderWidth: 1,
    borderColor: 'blue',
  },
  searchButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  noticeItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  date: {
    fontSize: 16,
    marginRight: 10,
    color: 'black',
  },
  pdfName: {
    fontSize: 16,
    flex: 1,
    color: 'black',
  },
  noPdfText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Notice;
