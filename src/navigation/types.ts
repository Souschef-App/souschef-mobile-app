import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import type {
  CompositeNavigationProp,
  RouteProp,
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
  TaskDrawer: TaskDrawerNavigatorParamList;
};

export type TaskDrawerNavigatorParamList = {
  Task: undefined;
  Feed: undefined;
  Invite: undefined;
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
  TimeScreen: { date: string | null };
  MealNameScreen: {
    date: string | null;
    time: string | null;
  };
  RecipeSelectorScreen: {
    date: string | null;
    time: string | null;
    mealName: string;
  };
  OccasionScreen: {
    date: string | null;
    time: string | null;
  };
  FavoriteScreen: undefined;
  CalendarScreen: {
    date: string | null;
    time: string | null;
    mealName: string;
  };
};

export const defaultMealPlanNavigatorParamList: MealPlanNavigatorParamList = {
  MealPlan: undefined,
  EnterDescriptionScreen: undefined,
  TaskBreakDownResultScreen: undefined,
  DateScreen: undefined,
  TimeScreen: { date: null },
  MealNameScreen: {
    date: null,
    time: null,
  },
  RecipeSelectorScreen: {
    date: null,
    time: null,
    mealName: "",
  },
  OccasionScreen: {
    date: null,
    time: null,
  },
  FavoriteScreen: undefined,
  CalendarScreen: {
    date: null,
    time: null,
    mealName: "",
  },
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

export const defaultTaskDrawerNavigatorParamList: TaskDrawerNavigatorParamList =
  {
    Task: undefined,
    Feed: undefined,
    Invite: undefined,
  };

export const defaultHomeStackNavigatorParamList: HomeStackNavigatorParamList = {
  Tabs: defaultBottomTabNavigatorParamList,
  TaskDrawer: defaultTaskDrawerNavigatorParamList,
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

export type TaskScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackNavigatorParamList, "TaskDrawer">,
  DrawerNavigationProp<TaskDrawerNavigatorParamList, "Task">
>;

export type FeedScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<TaskDrawerNavigatorParamList, "Feed">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "TaskDrawer">
>;

export type InviteScreenNavigationProp = DrawerNavigationProp<
  TaskDrawerNavigatorParamList,
  "Invite"
>;

export type CalendarScreenNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  "Calendar"
>;

export type DateScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "DateScreen"
>;

export type TimeScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "TimeScreen"
>;

export type MealNameScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "MealNameScreen"
>;

export type RecipeSelectorScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "CalendarScreen"
>;

export type OccasionScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "OccasionScreen"
>;

export type FavoriteScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "FavoriteScreen"
>;

export type TimeScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "TimeScreen"
>;

export type OccasionScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "OccasionScreen"
>;

export type MealNameScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "MealNameScreen"
>;
export type CalendarScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "CalendarScreen"
>;

//i am running out of time

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
