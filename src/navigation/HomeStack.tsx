import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from './types';
import {HomeScreen, TaskScreen, LoginScreen, SignupScreen, PreMealListScreen} from '../screens';

// Guide: https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Signup" component={SignupScreen} />
      <HomeStack.Screen name="TaskScreen" component={TaskScreen} />
      <HomeStack.Screen name="PreMealListScreen" component={PreMealListScreen}/>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
