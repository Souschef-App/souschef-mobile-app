import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {defaultRecipe, Recipe} from '../api/responses';

export type HomeStackNavigatorParamList = {
  BottomTabs: BottomTabNavigatorParamList;
  Recipe: {
    recipe: Recipe;
  };
  Task: {
    sessionId: string;
  };
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Favorite: undefined;
  Cook: undefined;
  Calendar: undefined;
  Profile: undefined;
};

export type WelcomeStackNavigatorParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  HomeStack: HomeStackNavigatorParamList;
  WebSocket: undefined;
};

export const defaultBottomTabNavigatorParamList: BottomTabNavigatorParamList = {
  Home: undefined,
  Favorite: undefined,
  Cook: undefined,
  Calendar: undefined,
  Profile: undefined,
};

export const defaultHomeStackNavigatorParamList: HomeStackNavigatorParamList = {
  BottomTabs: defaultBottomTabNavigatorParamList,
  Recipe: {
    recipe: defaultRecipe,
  },
  Task: {
    sessionId: '',
  },
};

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Login' | 'Register'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Register',
  'BottomTabs'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Login',
  'BottomTabs'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Recipe'
>;

export type RecipeScreenNavigationProp = BottomTabNavigationProp<
  HomeStackNavigatorParamList,
  'BottomTabs'
>;

export type CookScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Task'
>;

export type TaskScreenNavigationProp = BottomTabNavigationProp<
  HomeStackNavigatorParamList,
  'BottomTabs'
>;

// Type definition for route prop to a specific screen
// E.g: Describe the type of "route" when accessing it in LoginScreen
export type LoginScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Login'
>;

export type RegisterScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Register'
>;

export type RecipeScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Recipe'
>;

export type TaskScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Task'
>;
