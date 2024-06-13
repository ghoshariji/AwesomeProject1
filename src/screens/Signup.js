import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Button from '../componets/Button';
import Loader from '../loader/Loader1';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Ionicons1 from 'react-native-vector-icons/AntDesign';
import { handleSignup1 } from "../api/authApi";

const Signup = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const handleInput = (name, value) => {
    setPost({...post, [name]: value});
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = await handleSignup1(post);
      if (data.success) {
        setLoading(false)
        setTimeout(()=>{
          navigation.navigate('Login');
        },800)
        ToastAndroid.show("Register Successfully",ToastAndroid.SHORT)
      }
    } catch (error) {
      setLoading(false)
      ToastAndroid.show("Something Went Wrong....",ToastAndroid.SHORT)
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={{flex: 1, marginHorizontal: 22}}>
          <View style={{marginVertical: 22}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginVertical: 12,
                color: COLORS.black,
              }}>
              Create Account 👍
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}>
              Connect with your future Job!
            </Text>
          </View>

          <View style={{marginBottom: 12}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
                color: COLORS.black,
              }}>
              Name
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
                value={post.name}
                onChangeText={e => handleInput('name', e)}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                  color:'black'
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
                color: COLORS.black,
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
                value={post.email}
                onChangeText={e => handleInput('email', e)}
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: '100%',
                  color:'black'
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
                color: COLORS.black,
              }}>
              Mobile Number
            </Text>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 22,
              }}>
              <TextInput
                placeholder="+91"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: '12%',
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: '100%',
                  color:'black'
                }}
              />

              <TextInput
                value={post.phone}
                onChangeText={e => handleInput('phone', e)}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: '80%',
                  color:'black'
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
                color:'black'
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
                value={post.password}
                onChangeText={e => handleInput('password', e)}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                style={{
                  width: '100%',
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: 'absolute',
                  right: 12,
                }}>
                {isPasswordShown == true ? (
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
          <Button
            title="Sign Up"
            onPress={handleSignup}
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
            <Text style={{fontSize: 14, color: COLORS.black}}>
              Or Sign up with
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
              <Text style={{color: COLORS.black}}>Facebook</Text>
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
              <Text style={{color: COLORS.black}}>Google</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 22,
            }}>
            <Text style={{fontSize: 16, color: COLORS.black}}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginLeft: 6,
                }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;
