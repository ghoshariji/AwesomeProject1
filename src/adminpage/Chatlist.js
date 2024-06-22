import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Loading from '../loader/Loader2';
import Toast from 'react-native-toast-message';
import {getAdminChat} from '../api/adminApi';
const Chatlist = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [oldChat, setOldChat] = useState([]);

  const fetchChat = async () => {
    try {
      const data = await getAdminChat();
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

  const filteredChats = oldChat.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleReply = chat => {
    navigation.navigate('Admin Reply', {chat});
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name ..."
        placeholderTextColor="black"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {isLoading && <Loading />}
      <Toast />
      <ScrollView>
        {filteredChats.map((chat,index) => (
          <TouchableOpacity key={index} onPress={() => handleReply(chat)}>
            <View  style={styles.chatItem}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatMessage}>
                {chat.chat[chat.chat.length - 1].message}
              </Text>
            </View>
          </TouchableOpacity>
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
