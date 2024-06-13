import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet,ToastAndroid } from "react-native";
import { uploadQuery } from "../api/userApi";
import Loader from "../loader/Loader2"

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !query) {
      ToastAndroid.show("All filed Required...",ToastAndroid.SHORT)
    }
    try {
      setLoading(true)
      const data = await uploadQuery({ name, email, phone, query });
      ToastAndroid.show("Submitted Successfully",ToastAndroid.SHORT)
      setLoading(false)
      console.log(data.data);
    } catch (error) {
      ToastAndroid.show("Internet Error ....",ToastAndroid.SHORT)
      setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="grey" 
        value={name}
        onChangeText={setName}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor="grey" 
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        placeholderTextColor="grey" 
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, styles.queryInput]}
        placeholder="Query"
        value={query}
        placeholderTextColor="grey" 
        onChangeText={setQuery}
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'black',
  },
  queryInput: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default Contact;
