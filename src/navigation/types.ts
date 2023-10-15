import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type {
  RouteProp,
  CompositeNavigationProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
  DateScreen: undefined;
  TimeScreen: undefined;
  MealNameScreen: undefined;
  RecipeSelectorScreen: undefined;
  OccasionScreen: undefined;
  FavoriteScreen: undefined;
  CalendarScreen: undefined;
};

export const defaultMealPlanNavigatorParamList: MealPlanNavigatorParamList = {
  MealPlan: undefined,
  EnterDescriptionScreen: undefined,
  TaskBreakDownResultScreen: undefined,
  DateScreen: undefined,
  TimeScreen: undefined,
  MealNameScreen: undefined,
  RecipeSelectorScreen: undefined,
  OccasionScreen: undefined,
  FavoriteScreen: undefined,
  CalendarScreen: undefined
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

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  "Welcome"
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  "Login"
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  WelcomeStackNavigatorParamList,
  "Register"
>;

export type HomeScreenNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  "Home"
>;

export type MealPlanNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "MealPlan"
>;

export type EnterDescriptionScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "EnterDescriptionScreen"
>;

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

export type TaskScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Task"
>;

export type FeedScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Feed"
>;

export type ParticipantsScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Participants"
>;

export type CalendarScreenNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  "Calendar"
>;

export type DateScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "DateScreen">;

export type TimeScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "TimeScreen">;

  export type MealNameScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "MealNameScreen">;

  export type RecipeSelectorScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "RecipeSelectorScreen">

  export type OccasionScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "OccasionScreen">;

  export type FavoriteScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "FavoriteScreen">;

// Type definition for route prop to a specific screen
// E.g: Describe the type of "route" when accessing it in LoginScreen
// TODO: Pass animationID/animationType
export type LoginScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  "Login"
>;

export type RegisterScreenRouteProp = RouteProp<
  WelcomeStackNavigatorParamList,
  "Register"
>;
