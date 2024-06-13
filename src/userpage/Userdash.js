import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homeuser from "./Homeuser";


import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Courses from "./Courses";
import Menu from "./Menu";

const Tab = createBottomTabNavigator();

const Userhome = ({ route }) => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      activeTintColor: "blue",
      inactiveTintColor: "gray",
      tabBarLabelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "lightgray",
      },
      tabBarIconStyle: {
        color: "black", // Set icon color to black
      },
    }}
  >
       <Tab.Screen
        name="homeuser"
        component={Homeuser}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={Courses}
        options={{
          tabBarLabel: "Course",
          tabBarIcon: ({ color, size }) => (
            <Ionicons1 name="google-classroom" color={color} size={size} />
          ),
        }}
      />
     <Tab.Screen
        name="Menu"
        component={Menu}
        // initialParams={{ paramKey: id, name: name }}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Userhome;
