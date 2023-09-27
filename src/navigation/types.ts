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
  Login: {
    animationID: number;
  };
  Register: {
    animationID: number;
  };
  HomeStack: HomeStackNavigatorParamList;
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
  'Register',
  'Login'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Register',
  'BottomTabs'
>;

export type LoginScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  'Login',
  'BottomTabs'
>;

export type RegisterScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  'Register'
>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Recipe'
>;

export type RecipeScreenNavigationProp = BottomTabNavigationProp<
  HomeStackNavigatorParamList,
  'BottomTabs'
>;

export type RecipeScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Recipe'
>;

export type CookScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Task'
>;

export type TaskScreenNavigationProp = BottomTabNavigationProp<
  HomeStackNavigatorParamList,
  'BottomTabs'
>;

export type TaskScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'Task'
>;
