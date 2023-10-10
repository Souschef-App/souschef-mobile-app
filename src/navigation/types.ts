import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  BottomTabs: BottomTabNavigatorParamList;
  Recipe: undefined;
  Task: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Mealplan: undefined;
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

export const defaultBottomTabNavigatorParamList: BottomTabNavigatorParamList = {
  Home: undefined,
  Mealplan: undefined,
  QRScan: undefined,
  Calendar: undefined,
};

export const defaultHomeStackNavigatorParamList: HomeStackNavigatorParamList = {
  BottomTabs: defaultBottomTabNavigatorParamList,
  Recipe: undefined,
  Task: undefined,
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

// Type definition for route prop to a specific screen
// E.g: Describe the type of "route" when accessing it in LoginScreen
export type LoginScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  "Login"
>;

export type RegisterScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  "Register"
>;

export type RecipeScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "Recipe"
>;

export type TaskScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "Task"
>;
