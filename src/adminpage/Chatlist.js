import React, {useState} from 'react';
import {Text, View, TextInput, ScrollView, StyleSheet} from 'react-native';

const Chatlist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([
    {id: '1', name: 'Alice', lastMessage: 'Hey, how are you?'},
    {id: '2', name: 'Bob', lastMessage: 'Can we meet tomorrow?'},
    {id: '3', name: 'Charlie', lastMessage: 'What about the project?'},
    // Add more chats here as needed
  ]);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name ..."
        placeholderTextColor="black"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView>
        {filteredChats.map(chat => (
          <View key={chat.id} style={styles.chatItem}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <Text style={styles.chatMessage}>{chat.lastMessage}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue color theme
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  chatItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  chatName: {
    fontWeight: 'bold',
    color: 'black',
  },
  chatMessage: {
    color: '#555',
  },
});

export default Chatlist;
