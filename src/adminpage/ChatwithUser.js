import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUserChat, saveUserChat} from '../api/userApi';
import Loading from '../loader/Loader2';
import Toast from 'react-native-toast-message';
import { getAdminChatById, saveAdminChat } from '../api/adminApi';
const ChatWithUser = ({route}) => {
  const {chat} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setNewMessage] = useState('');
  const [oldChat, setOldChat] = useState([]);
  const fetchChat = async () => {
    try {
      const data = await getAdminChatById(chat.id);
      setOldChat(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'NetWork Error .... Please Wait',
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchChat();
  }, []);

  const handleSend = async e => {
    e.preventDefault();
    try {
      const userId = chat.id
      const data = await saveAdminChat({userId, message});
      fetchChat();
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Toast />
      <ScrollView style={styles.messagesContainer}>
        {oldChat.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'admin'
                ? styles.adminBubble
                : styles.userBubble,
            ]}>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, {color: 'black'}]}
          placeholder="Type your message..."
          placeholderTextColor="black"
          value={message}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  adminBubble: {
    backgroundColor: 'blue',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatWithUser;
