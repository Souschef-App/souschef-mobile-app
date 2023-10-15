import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {defaultRecipe, Recipe} from '../api/responses';

export type WelcomeStackNavigatorParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  HomeStack: HomeStackNavigatorParamList;
};

export type HomeStackNavigatorParamList = {
  Tabs: BottomTabNavigatorParamList;
  Task: undefined;
  Feed: undefined;
  Participants: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Mealplan: MealPlanNavigatorParamList;
  Join: JoinNavigatorParamList;
  Calendar: undefined;
};

export type JoinNavigatorParamList = {
  JoinSelection: undefined;
  QRCode: undefined;
  SessionCode: undefined;
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

export const defaultJoinNavigatorParamList: JoinNavigatorParamList = {
  JoinSelection: undefined,
  QRCode: undefined,
  SessionCode: undefined,
};

export const defaultBottomTabNavigatorParamList: BottomTabNavigatorParamList = {
  Home: undefined,
  Mealplan: defaultMealPlanNavigatorParamList,
  Join: defaultJoinNavigatorParamList,
  Calendar: undefined,
};

export const defaultHomeStackNavigatorParamList: HomeStackNavigatorParamList = {
  Tabs: defaultBottomTabNavigatorParamList,
  Task: undefined,
  Feed: undefined,
  Participants: undefined,
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

export type JoinScreenNavigationProp = NativeStackNavigationProp<
  JoinNavigatorParamList,
  "JoinSelection"
>;

export type QRCodeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<JoinNavigatorParamList, "QRCode">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "Tabs">
>;

export type SessionCodeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<JoinNavigatorParamList, "SessionCode">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "Tabs">
>;

export type MealPlanNavigationProp =
  NativeStackNavigationProp<MealPlanNavigatorParamList>;

export type EnterDescriptionScreenNavigationProp =
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

