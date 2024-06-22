import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { uploadQuery } from '../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, { Toast } from 'toastify-react-native';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [jobtype, setJobType] = useState('');
  const [currstudy, setCurrStudy] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !phone || !gender || !address || !jobtype || !currstudy || !query) {
      Toast.error('Please Enter all Fields ...');
      setLoading(false);
      return;
    }
    try {
      const data = await uploadQuery({
        name,
        email,
        phone,
        gender,
        address,
        jobtype,
        currstudy,
        query,
      });
      if (data.data.success) {
        Toast.success('We will Contact You soon ..');
        setLoading(false);
        setGender('');
        setAddress('');
        setJobType('');
        setCurrStudy('');
        setQuery('');
      } else {
        Toast.error('Ops! Please Wait ...😒');
        setLoading(false);
      }
    } catch (error) {
      Toast.error('Network Error ...😒');
      setLoading(false);
    }
  };

  const fetch = async () => {
    const name1 = await AsyncStorage.getItem('name');
    const email1 = await AsyncStorage.getItem('email');
    const phone1 = await AsyncStorage.getItem('phone');
    setName(name1 || '');
    setEmail(email1 || '');
    setPhone(phone1 || '');
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Contact Us</Card.Title>
          <Card.Divider />
          <ToastManager />
          <View style={styles.inputContainer}>
            <Icon name="user" type="font-awesome" color="#517fa4" size={20} />
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" type="font-awesome" color="#517fa4" size={20} />
            <TextInput
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="phone" type="font-awesome" color="#517fa4" size={20} />
            <TextInput
              placeholder="Phone Number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhone(text)}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <Text style={styles.label}>Gender*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender *" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>

          <Text style={styles.label}>Job Type*</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={jobtype}
              onValueChange={(value) => setJobType(value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Type *" value="" />
              <Picker.Item label="UPSC" value="upsc" />
              <Picker.Item label="WBCS" value="wbcs" />
              <Picker.Item label="PSC" value="psc" />
              <Picker.Item label="POLICE" value="police" />
              <Picker.Item label="RAIL" value="rail" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="book" type="font-awesome" color="#517fa4" />
            <TextInput
              placeholder="Currently you are studying *"
              value={currstudy}
              onChangeText={(text) => setCurrStudy(text)}
              style={styles.input}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="home" type="font-awesome" color="#517fa4" />
            <TextInput
              placeholder="Enter your address *"
              value={address}
              multiline
              numberOfLines={2}
              onChangeText={(text) => setAddress(text)}
              style={[styles.input, styles.multilineInput]}
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="question" type="font-awesome" color="#517fa4" />
            <TextInput
              placeholder="Enter your Query or any Doubt *"
              value={query}
              multiline
              numberOfLines={2}
              onChangeText={(text) => setQuery(text)}
              style={[styles.input, styles.multilineInput]}
              placeholderTextColor="#888"
            />
          </View>
        </Card>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          buttonStyle={styles.submitButton}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    color: '#517fa4',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
  multilineInput: {
    height: 60,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 48,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#517fa4',
    marginLeft: 15,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  submitButton: {
    backgroundColor: '#517fa4',
  },
});

export default Contact;
