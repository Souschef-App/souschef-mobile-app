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
  Mealplan: MealPlanNavigatorParamList;
  QRScan: undefined;
  Calendar: undefined;
};

export type WelcomeStackNavigatorParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  HomeStack: HomeStackNavigatorParamList;
  WebSocket: undefined;
};

export type MealPlanNavigatorParamList = {
  MealPlan: undefined;
  EnterDescriptionScreen: undefined;
  TaskBreakDownResultScreen: undefined;
};

export const defaultMealPlanNavigatorParamList: MealPlanNavigatorParamList = {
  MealPlan: undefined,
  EnterDescriptionScreen: undefined,
  TaskBreakDownResultScreen: undefined,
};
export const defaultBottomTabNavigatorParamList: BottomTabNavigatorParamList = {
  Home: undefined,
  Mealplan: defaultMealPlanNavigatorParamList,
  QRScan: undefined,
  Calendar: undefined,
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

export type WelcomeScreenNavigationProp =
  NativeStackNavigationProp<WelcomeStackNavigatorParamList>;

export type LoginScreenNavigationProp =
  NativeStackNavigationProp<WelcomeStackNavigatorParamList>;

export type RegisterScreenNavigationProp =
  NativeStackNavigationProp<WelcomeStackNavigatorParamList>;

export type HomeScreenNavigationProp =
  NativeStackNavigationProp<HomeStackNavigatorParamList>;

export type RecipeScreenNavigationProp =
  BottomTabNavigationProp<HomeStackNavigatorParamList>;

export type CookScreenNavigationProp =
  NativeStackNavigationProp<HomeStackNavigatorParamList>;

export type TaskScreenNavigationProp =
  BottomTabNavigationProp<HomeStackNavigatorParamList>;

export type MealPlanNavigationProp =
  NativeStackNavigationProp<MealPlanNavigatorParamList>;

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
