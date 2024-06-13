import {View, Text, Pressable, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../componets/Button';
import Toast from 'react-native-toast-message';

import Pdf from 'react-native-pdf';

const Welcome = ({navigation}) => {
  const handleLogin = () => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 500);
  };

  const handleSignup = () => {
    setTimeout(() => {
      navigation.navigate('Admindash');
    }, 500);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View style={{flex: 1}}>
        <View>
          <Image
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
          />

          <Image
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
          />

          <Image
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
          />

          <Image
            source={require('../assets/welcome.jpg')}
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

export default Welcome;
