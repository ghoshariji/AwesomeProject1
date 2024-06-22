import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {fetchQuery} from '../api/adminApi';
import Loader from '../loader/Loader1';
const Admincontact = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // const [contacts, setContacts] = useState([
  //   {id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890'},
  //   {
  //     id: 2,
  //     name: 'Alice Smith',
  //     email: 'alice@example.com',
  //     phone: '987-654-3210',
  //   },
  //   {
  //     id: 3,
  //     name: 'Bob Johnson',
  //     email: 'bob@example.com',
  //     phone: '555-123-4567',
  //   },
  //   {
  //     id: 4,
  //     name: 'Emma Brown',
  //     email: 'emma@example.com',
  //     phone: '111-222-3333',
  //   },
  //   // Add more contacts here
  // ]);

  const [contacts, setContacts] = useState([]);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await fetchQuery();
      setContacts(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSearch = text => {
    setSearchQuery(text);
    // Perform search logic here and filter contacts based on searchQuery
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.email}</Text>
      <Text style={styles.itemText}>{item.phone}</Text>
      <Text style={styles.itemText}>{item.query}</Text>
    </TouchableOpacity>
  );

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.query.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="black"
      />
      {/* Table header */}

      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Phone</Text>
        <Text style={styles.headerText}>Query</Text>
      </View>
      {loading && <Loader />}
      {/* Contact list */}
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.list}
      />
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
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemText: {
    flex: 1,
    color: 'black',
  },
  list: {
    flex: 1,
  },
});

export default Admincontact;
