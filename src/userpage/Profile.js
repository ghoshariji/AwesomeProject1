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
import Toast from 'react-native-toast-message';

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
    Toast.show({
      type: 'success',
      text1: 'Logout Successfully',
    });
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
      <View style={styles.topSection}>
        {/* Profile Image */}
        <Toast />
        <TouchableOpacity onPress={handleChangeProfilePic}>
          <Image
            source={
              profileImage
                ? {uri: profileImage}
                : require('../assets/welcome.jpg')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileInfo}>Phone: +91 {phone}</Text>
        <Text style={styles.profileInfo}>Email: {email}</Text>
      </View>

      <ScrollView style={styles.optionsContainer}>
        {/* Change Name Option */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setChangeNameModalVisible(true)}>
          <Ionicons name="rename-box" color="red" size={22} />
          <Text style={{color: 'black', marginLeft: 30}}>Change Name</Text>
        </TouchableOpacity>

        {/* Change Password Option */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setChangePasswordModalVisible(true)}>
          <Ionicons1 name="password" color="red" size={22} />
          <Text style={{color: 'black', marginLeft: 30}}>Change Password</Text>
        </TouchableOpacity>

        {/* Change Profile Picture Option */}
        <TouchableOpacity
          style={styles.optionItem}
          onPress={handleChangeProfilePic}>
          <Ionicons2 name="picture" color="red" size={18} />
          <Text style={{color: 'black', marginLeft: 30}}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>

        {/* Log out Option */}

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
          {/* <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={handleCloseNameModal}
              style={styles.closeIcon}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View> */}

          <View style={styles.modalContent}>
            {/* Change Name */}
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

      {/* Modal for Change Password */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Change Password */}
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
            {/* <TextInput type="file" /> */}
            <TouchableOpacity onPress={handleChangeProfilePic}>
              <Text>Select Image</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={submitImage}>
            <Text>Submit</Text>
          </TouchableOpacity> */}
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
    marginTop: 40,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
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
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  profileInfo: {
    fontSize: 16,
    color: 'black',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeIcon: {
    padding: 5,
  },
});

export default Profile;
