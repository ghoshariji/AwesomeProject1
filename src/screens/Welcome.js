import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../componets/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Entypo';
import SplashScreen from "react-native-splash-screen";
import FastImage from 'react-native-fast-image'

const Welcome = ({navigation}) => {
  const handleLogin = () => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 200);
  };
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSignup = () => {
    setTimeout(() => {
      navigation.navigate('Admindash');
    }, 200);
  };

  useEffect(() => {
    const clearStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          await AsyncStorage.clear();
        }
      } catch (error) {}
    };

    clearStorage();
  }, []);

  useEffect(()=>{
    SplashScreen.hide();
  },[])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={{flex: 1}}>
        <View>
          <FastImage
            source={require('../assets/welcome1.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 10,
              transform: [
                {translateX: 20},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              closeModal();
            }}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={closeModal}
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: 1,
                  marginRight: 20,
                }}>
                <Ionicons name="circle-with-cross" color="red" size={30} />
              </TouchableOpacity>
              <View style={styles.modalContent}>
                <FastImage
                  source={require('../assets/baa13.jpg')}
                  style={styles.offerImage}
                  priority={FastImage.priority.normal}
                  resizeMode={FastImage.resizeMode.contain}
                  //resizeMode="stretch"
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </View>
          </Modal>

          <FastImage
            source={require('../assets/welcome1.jpg')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: 'absolute',
              top: -30,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-5deg'},
              ],
            }}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
          />

          <FastImage
            source={require('../assets/welcome2.jpg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: 'absolute',
              top: 130,
              left: -50,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '15deg'},
              ],
            }}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
          />

          <FastImage
            source={require('../assets/welcome.jpg')}
            priority={FastImage.priority.normal}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: 'absolute',
              top: 110,
              left: 100,
              transform: [
                {translateX: 50},
                {translateY: 50},
                {rotate: '-15deg'},
              ],
            }}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 22,
            position: 'absolute',
            top: 400,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}>
            Let's Get
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.white,
            }}>
            Started
          </Text>

          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}>
              Start your journey with Us.
            </Text>
            {/* <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>
                           
                        </Text> */}
          </View>

          <Button
            title="Log in"
            onPress={handleLogin}
            style={{
              marginTop: 22,
              width: '100%',
              color: COLORS.primary,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}>
              Don't Have An Account ?
            </Text>
            <Pressable
              //  onPress={() => navigation.navigate("Admindash")}
              onPressIn={handleSignup}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}>
                Signup
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  offerImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginBottom: 2,
  },
  closeButton: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;
