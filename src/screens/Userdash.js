import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homeuser from "./Homeuser";
import Resultuser from "./Resultuser";
import Profileuser from "./Profileuser";
import Examuser from "./Examuser";

import { Ionicons } from "@expo/vector-icons";
import Notice from "./Notice";

const Tab = createBottomTabNavigator();

const Userhome = ({ route }) => {
  // const { paramKey: id } = route.params;
  // const { name: name } = route.params;
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
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homeuser}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={Notice}
        options={{
          tabBarLabel: "Notice",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Exam"
        component={Examuser}
        // initialParams={{ paramKey: id, name: name }}
        options={{
          tabBarLabel: "Exam",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Result"
        component={Resultuser}
        // initialParams={{ paramKey: id }}
        options={{
          tabBarLabel: "Result",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profileuser}
        // initialParams={{ name: name ,id: id}}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Userhome;
