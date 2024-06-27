

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons1 from 'react-native-vector-icons/MaterialIcons';
import Ionicons2 from 'react-native-vector-icons/Fontisto';
import Ionicons3 from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastManager, {Toast} from 'toastify-react-native';

const Profile = ({navigation}) => {
  const [changeNameModalVisible, setChangeNameModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [addImageModalVisible, setAddImageModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleChangeName = () => {
    setChangeNameModalVisible(false);
  };

  const handleCloseNameModal = () => {
    setChangeNameModalVisible(false);
  };

  const handleClosePasswordModal = () => {
    setChangePasswordModalVisible(false);
  };

  const handleChangePassword = () => {
    setChangePasswordModalVisible(false);
  };

  const handleChangeProfilePic = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5, // Adjust the image quality if needed
    };

    try {
      const response = await ImagePicker.launchImageLibrary(options);
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0].uri);
        console.log(response.assets[0]);
      }
      setAddImageModalVisible(false);
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Toast.success('Logout Successfully');
    setTimeout(() => {
      navigation.navigate('Login');
    }, 500);
  };

  useEffect(() => {
    const name = AsyncStorage.getItem('name');
    const email = AsyncStorage.getItem('email');
    const phone = AsyncStorage.getItem('phone');
    setName(name);
    setEmail(email);
    setPhone(phone);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ToastManager />
      <View style={styles.topSection}>
        <TouchableOpacity onPress={handleChangeProfilePic}>
          <Image
            source={
              profileImage
                ? {uri: profileImage}
                : require('../assets/baa-profile.jpeg')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.profileName}>{name || 'Arijit Ghosh'}</Text>
        <Text style={styles.profileInfo}>Phone: {phone || '7439120030'}</Text>
        <Text style={styles.profileInfo}>
          Email: {email || 'arijit1087.be22@chitkarauniversity.edu.in'}
        </Text>
      </View>

      <ScrollView style={styles.optionsContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Profile Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Language:</Text>
            <Text style={styles.infoValue}>Bengali / English</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Performance as Doubt Solver</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Doubts Solved:</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setChangeNameModalVisible(true)}>
          <Ionicons name="rename-box" color="red" size={22} />
          <Text style={{color: 'black', marginLeft: 30}}>Change Name</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setChangePasswordModalVisible(true)}>
          <Ionicons1 name="password" color="red" size={22} />
          <Text style={{color: 'black', marginLeft: 30}}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={handleChangeProfilePic}>
          <Ionicons2 name="picture" color="red" size={18} />
          <Text style={{color: 'black', marginLeft: 30}}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <Ionicons3 name="logout" color="red" size={22} />
          <Text style={{color: 'black', marginLeft: 33}}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changeNameModalVisible}
        onRequestClose={() => setChangeNameModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setChangeNameModalVisible(false)}
              style={[styles.closeIcon, {alignItems: 'flex-end'}]}>
              <Ionicons
                name="close"
                size={24}
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter new name"
              onChangeText={text => setNewName(text)}
              placeholderTextColor="black"
            />
            <TouchableOpacity style={styles.button} onPress={handleChangeName}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setChangePasswordModalVisible(false)}
              style={[styles.closeIcon, {alignItems: 'flex-end'}]}>
              <Ionicons
                name="close"
                size={24}
                color="black"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="black"
              onChangeText={text => setNewPassword(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addImageModalVisible}
        onRequestClose={() => setAddImageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setAddImageModalVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleChangeProfilePic}>
              <Text>Select Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  topSection: {
    marginTop: 5,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    marginVertical: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    marginBottom: 5,
    color: 'black',
        fontFamily:'Rowdies-Light'
  },
  profileInfo: {
    fontSize: 16,
    color: 'black',
        fontFamily:'Rowdies-Light'
  },
  optionsContainer: {
    marginTop: 5,
  },
  infoSection: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    fontFamily:'Rowdies-Light'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'red',
  },
});


export default Profile;
