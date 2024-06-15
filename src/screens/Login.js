import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons1 from 'react-native-vector-icons/AntDesign';
import Button from '../componets/Button';
import {handleLogin1} from '../api/authApi';
import Loader from '../loader/Loader1';
import Toast from 'react-native-toast-message';
import Toast1 from '../toast/toast2';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [post, setPost] = useState({
    email: '',
    password: '',
  });

  // clear all the session data

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

  const handleInput = (name, value) => {
    setPost({...post, [name]: value});
  };
  const handleLogin = async e => {

    setLoading(true);
    e.preventDefault();
    try {
      // setTimeout(() => {
      //   navigation.navigate('Userdash');
      // }, 500);
      const data = await handleLogin1(post);
      setLoading(false);

      if (data.data.statusCode === 201) {
        Toast.show({
          type: 'success',
          text1: data.data.message,
          position: 'bottom',
        });
      } else if (data.data.statusCode === 202) {
        Toast.show({
          type: 'success',
          text1: data.data.message,
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: data.data.message,
          position: 'bottom',
        });
        AsyncStorage.setItem('name', data.data.user.name);
        AsyncStorage.setItem('email', data.data.user.email);
        AsyncStorage.setItem('phone', data.data.user.phone);
        AsyncStorage.setItem('token', data.data.token);
        if (data.data.isAdmin) {
          setTimeout(() => {
            navigation.navigate('Admindash');
          }, 500);
        } else {
          setTimeout(() => {
            navigation.navigate('Userdash');
          }, 500);
        }
      }

     
      setPost('');
    } catch (error) {
      setLoading(false);
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Network Error ....',
        position: 'bottom',
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Toast config={Toast1} />

      <View style={{flex: 1, marginHorizontal: 22}}>
        <View style={{marginVertical: 22}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}>
            Hi Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}>
            Hello again you have been missed!
          </Text>
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: 'black',
            }}>
            Email address
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Enter your email address"
              value={post.email}
              onChangeText={e => handleInput('email', e)}
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%',
                color: 'black',
              }}
            />
          </View>
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: 'black',
            }}>
            Password
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Enter your password"
              value={post.password}
              onChangeText={e => handleInput('password', e)}
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
                color: 'black',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {isPasswordShown ? ( // Changed condition here
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}></View>

        {errorMessage && (
          <Text style={{marginLeft: 25, color: 'red', marginBottom: 12}}>
            {errorMessage}
          </Text>
        )}
        {loading && <Loader />}
        <Button
          title="Login"
          onPress={handleLogin}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              fontSize: 14,
            }}>
            Or Login with
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}>
            <Ionicons1
              size={20}
              name="facebook-square"
              color="blue"
              style={{
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: COLORS.black,
              }}>
              Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}>
            <Ionicons1
              size={20}
              name="google"
              color="#34A853"
              style={{
                marginRight: 8,
              }}
            />

            <Text
              style={{
                color: COLORS.black,
              }}>
              Google
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Don't have an account ?{' '}
          </Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
