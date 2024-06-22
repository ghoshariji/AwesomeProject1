import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Homeuser from './Homeuser';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons1 from 'react-native-vector-icons/FontAwesome5';
import Courses from './Courses';
import Menu from './Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateTokenUser} from '../api/authApi';
import Accessdenied from '../screens/Accessdenied';

const Tab = createBottomTabNavigator();

const Userhome = ({route}) => {
  const [token, setToken] = useState('');
  const [access, setAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const validateToken = async () => {
    try {
      const checkToken = await AsyncStorage.getItem('token');
      setToken(checkToken);
      if (checkToken) {
        const data = await validateTokenUser(checkToken);
        if (data.statusCode === 200) {
          setAccess(true);
        } else {
          setAccess(false);
        }
      } else {
        setAccess(false);
      }
    } catch (error) {
      setAccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CB1B8" />
      </View>
    );
  }

  if (!access) {
    return <Accessdenied />;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4CB1B8',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          color: 'white',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 3,
          left: 2,
          right: 2,
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
          borderRadius: 20,
          backgroundColor: '#8c8787',
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 10,
          overflow: 'hidden',
        },
        tabBarItemStyle: {
          backgroundColor: '#655fe8',
          overflow: 'hidden',
        },
        tabBarIconStyle: {
          marginBottom: -3, // Adjust icon position
        },
        tabBarShowLabel: true, // Show labels
      }}>
      <Tab.Screen
        name="homeuser"
        component={Homeuser}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={Courses}
        options={{
          tabBarLabel: 'Course',
          tabBarIcon: ({color, size}) => (
            <Ionicons1 name="book-open" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Userhome;
