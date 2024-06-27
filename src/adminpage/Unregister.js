import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {makeRegister, registerUser} from '../api/adminApi';
import ToastManager, {Toast} from 'toastify-react-native';

const Unregister = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [demoUsers, setDemouser] = useState([]);

  const fetch = async () => {
    try {
      const data = await registerUser();
      setDemouser(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleAcceptUser = async userId => {
    try {
      console.log(userId);
      const data = await makeRegister({userId});
      if (data.success) {
        Toast.success('Updated');
        fetch();
      }
    } catch (error) {
      Toast.error('Ops! Something wrong');
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const normalizeString = str => str.toLowerCase().trim();
  const filteredUsers = demoUsers.filter(user =>
    normalizeString(user.email).includes(normalizeString(searchQuery)),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <ToastManager />
        <Text style={styles.label}>Search by email</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by email"
          value={searchQuery}
          onChangeText={handleSearch}
          keyboardType="email-address"
          placeholderTextColor="black"
        />
      </View>

      <View style={styles.allUsersContainer}>
        {filteredUsers.map(user => {
          if (user.isInstitute !== true) {
            return (
              <View key={user._id} style={styles.userContainer}>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Accept"
                    onPress={() => handleAcceptUser(user._id)}
                    color="#007BFF"
                  />
                </View>
              </View>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
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
  allUsersContainer: {
    marginTop: 20,
  },
  allUsersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap', // Allows content to wrap within the container
  },
  userEmail: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    marginRight: 10,
    flexWrap: 'wrap', // Allows email text to wrap to the next line
  },
  buttonContainer: {
    flexShrink: 0, // Prevents the button from shrinking
  },
});

export default Unregister;
