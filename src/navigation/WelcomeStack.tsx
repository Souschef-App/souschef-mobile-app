import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { LoginScreen, RegisterScreen, WelcomeScreen } from "../screens";
import HomeStackNavigator from "./HomeStack";
import { WelcomeStackNavigatorParamList } from "./types";

const WelcomeStack =
  createNativeStackNavigator<WelcomeStackNavigatorParamList>();

const WelcomeStackNavigator = () => {
  return (
    <WelcomeStack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <WelcomeStack.Screen name="Login" component={LoginScreen} />
      <WelcomeStack.Screen name="Register" component={RegisterScreen} />
      <WelcomeStack.Screen name="HomeStack" component={HomeStackNavigator} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeStackNavigator;
