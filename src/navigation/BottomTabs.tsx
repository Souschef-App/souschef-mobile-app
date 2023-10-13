import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {Icon} from '../components';
import {
  CalendarScreen,
  HomeScreen,
  QRScanScreen,
} from '../screens';
import {BottomTabNavigatorParamList} from './types';
import MealPlanNavigator from './MealPlanStack';

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#2e9dfb',
        tabBarInactiveTintColor: '#b3bac0',
        tabBarStyle: {
          // Seamless transition (color)
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
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon('home'),
        }}
      />
      <BottomTab.Screen
        name="Mealplan"
        component={MealPlanNavigator}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon('meal'),
        }}
      />
      <BottomTab.Screen
        name="QRScan"
        component={QRScanScreen}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon('qr'),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon('calendar'),
        }}
      />
    </BottomTab.Navigator>
  );
};

const makeTabBarIcon = (iconName: string) => {
  return ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => <Icon name={iconName} color={color} size={size} />;
};

export default BottomTabs;
