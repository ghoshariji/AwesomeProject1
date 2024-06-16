import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, StyleSheet, ToastAndroid} from 'react-native';
import {uploadQuery} from '../api/userApi';
import Loader from '../loader/Loader2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!name || !email || !phone || !query) {
      ToastAndroid.show('All filed Required...', ToastAndroid.SHORT);
    }
    try {
      setLoading(true);
      const data = await uploadQuery({name, email, phone, query});
      ToastAndroid.show('Submitted Successfully', ToastAndroid.SHORT);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show('Internet Error ....', ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const fetch = async () => {
    const name1 = await AsyncStorage.getItem('name');
    const email1 = await AsyncStorage.getItem('email');
    const phone1 = await AsyncStorage.getItem('phone');
    setName(name1);
    setEmail(email1);
    setPhone(phone1);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="grey"
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor="grey"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        placeholderTextColor="grey"
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, styles.queryInput]}
        placeholder="Query"
        value={query}
        placeholderTextColor="grey"
        onChangeText={text => setQuery(text)}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  queryInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default Contact;
