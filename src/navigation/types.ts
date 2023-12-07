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
  HomeStack: {
    screen: string;
    params: HomeStackNavigatorParamList;
  };
};

export type HomeStackNavigatorParamList = {
  Tabs: BottomTabNavigatorParamList;
  QRCode: undefined;
  LiveSession: LiveSessionNavigatorParamList;
  SessionStartScreen: {
    session: any;
  };
};

export type LiveSessionNavigatorParamList = {
  Connecting: undefined;
  Connected: undefined;
  Running: TaskDrawerNavigatorParamList;
};

export type TaskDrawerNavigatorParamList = {
  Task: undefined;
  Tracker: undefined;
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
  SessionCode: undefined;
};

export type MealPlanNavigatorParamList = {
  MealPlan: undefined;
  NameRecipeScreen: undefined;
  EnterRecipeStepsScreen: undefined;
  EnterRecipeIngredientsScreen: undefined;
  TaskBreakDownResultScreen: undefined;
  DateScreen: undefined;
  TimeScreen: { date: string | null };
  MealNameScreen: {
    date: string | null;
    time: string | null;
    mealName: string;
    occasion: number;
    recipes: any[];
  };
  RecipeSelectorScreen: {
    date: string | null;
    time: string | null;
    occasion: number;
    recipes: any[];
    mealName: string;
    mealType: string;
  };
  OccasionScreen: {
    date: string | null;
    time: string | null;
  };
  FavoriteScreen: {
    date: string | null;
    time: string | null;
    occasion: number;
    recipes: any[];
    mealName: string;
    mealType: string;
  };
  CalendarScreen: {
    date: string | null;
    time: string | null;
    mealName: string;
  };
};

export const defaultMealPlanNavigatorParamList: MealPlanNavigatorParamList = {
  MealPlan: undefined,
  NameRecipeScreen: undefined,
  EnterRecipeStepsScreen: undefined,
  EnterRecipeIngredientsScreen: undefined,
  TaskBreakDownResultScreen: undefined,
  DateScreen: undefined,
  TimeScreen: { date: null },
  MealNameScreen: {
    date: null,
    time: null,
    mealName: "",
    recipes: [],
    occasion: 1,
  },
  RecipeSelectorScreen: {
    date: null,
    time: null,
    mealName: "",
    recipes: [],
    occasion: 1,
    mealType: "Appetizer",
  },
  OccasionScreen: {
    date: null,
    time: null,
  },
  FavoriteScreen: {
    date: null,
    time: null,
    mealName: "",
    recipes: [],
    occasion: 1,
    mealType: "Appetizer",
  },
  CalendarScreen: {
    date: null,
    time: null,
    mealName: "",
  },
};

export const defaultJoinNavigatorParamList: JoinNavigatorParamList = {
  JoinSelection: undefined,
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
    Tracker: undefined,
    Feed: undefined,
    Invite: undefined,
  };

export const defaultLiveSessionNavigatorParamList: LiveSessionNavigatorParamList =
  {
    Connecting: undefined,
    Connected: undefined,
    Running: defaultTaskDrawerNavigatorParamList,
  };

export const defaultHomeStackNavigatorParamList: HomeStackNavigatorParamList = {
  Tabs: defaultBottomTabNavigatorParamList,
  QRCode: undefined,
  LiveSession: defaultLiveSessionNavigatorParamList,
  SessionStartScreen: {
    session: null,
  },
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

export type NameRecipeScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "NameRecipeScreen"
>;

export type EnterRecipeStepsScreenNavigationProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "EnterRecipeStepsScreen"
>;

export type EnterRecipeIngredientsScreenNavigationProp =
  NativeStackNavigationProp<
    MealPlanNavigatorParamList,
    "EnterRecipeIngredientsScreen"
  >;

export type TaskBreakDownResultScreenProp = NativeStackNavigationProp<
  MealPlanNavigatorParamList,
  "TaskBreakDownResultScreen"
>;

export type JoinScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<JoinNavigatorParamList, "JoinSelection">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "Tabs">
>;

export type QRCodeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "QRCode"
>;

export type SessionCodeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<JoinNavigatorParamList, "SessionCode">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "Tabs">
>;

export type ConnectingScreenNavigationProp = NativeStackNavigationProp<
  LiveSessionNavigatorParamList,
  "Connecting"
>;

export type SessionStartScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "SessionStartScreen"
>;

export type ConnectedScreenNavigationProp = NativeStackNavigationProp<
  LiveSessionNavigatorParamList,
  "Connected"
>;

export type TaskScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<TaskDrawerNavigatorParamList, "Task">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "LiveSession">
>;

export type TrackerScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<TaskDrawerNavigatorParamList, "Tracker">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "LiveSession">
>;

export type FeedScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<TaskDrawerNavigatorParamList, "Feed">,
  NativeStackNavigationProp<HomeStackNavigatorParamList, "LiveSession">
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

export type FavoriteScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "FavoriteScreen"
>;

export type RecipeSelectorScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "RecipeSelectorScreen"
>;

export type CalendarScreenRouteProp = RouteProp<
  MealPlanNavigatorParamList,
  "CalendarScreen"
>;

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
