import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
  CalendarScreen,
  HomeScreen,
  MealplanScreen,
  QRScanScreen,
} from '../screens';
import {BottomTabNavigatorParamList} from './types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name == 'Home') iconName = 'home-variant';
          else if (route.name == 'QRScan') iconName = 'heart';
          else if (route.name == 'Mealplan') iconName = 'silverware-variant';
          else if (route.name == 'Calendar') iconName = 'calendar-blank';
          else iconName = 'checkbox-blank-outline';

          return (
            <MaterialCommunityIcon name={iconName} size={size} color={color} />
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#2F394A',
        tabBarInactiveTintColor: '#CBCDD1',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          // Android
          elevation: 0,
          // iOS
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Mealplan"
        component={MealplanScreen}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="QRScan"
        component={QRScanScreen}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
