import React from 'react'
import { View } from 'react-native'
import PagerView from 'react-native-pager-view';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Lecture from './Lecture';
import Periods from './Periods';
import Module from './Module';
const Tab = createMaterialTopTabNavigator();
const Institution = ({navigation}) => {
  return (
        <Tab.Navigator>
            {/* <Tab.Screen name="Class" component={Lecture}/> */}
            <Tab.Screen name="Module" component={Module} />
            <Tab.Screen name="Exam" component={Periods} />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
          </Tab.Navigator>
  )
}

export default Institution
