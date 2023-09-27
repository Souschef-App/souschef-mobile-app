import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  HomeScreen: undefined;
  Login: undefined;
  Signup: undefined;
  TaskScreen: {
    name: string;
  };
  PreMealListScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'HomeScreen'
>;

export type TaskScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'TaskScreen'
>;

export type LoginScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Login'
>;

export type SignupScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'Signup'
>;

export type PreMealListScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigatorParamList, 
  'PreMealListScreen'
>;
