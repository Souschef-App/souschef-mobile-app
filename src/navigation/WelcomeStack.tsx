import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { LoginScreen, RegisterScreen, WelcomeScreen } from "../screens";
import HomeStackNavigator from "./HomeStack";
import { WelcomeStackNavigatorParamList } from "./types";

// Guide: https://blog.jscrambler.com/getting-started-with-react-navigation-v6-and-typescript-in-react-native
const WelcomeStack =
  createNativeStackNavigator<WelcomeStackNavigatorParamList>();

const WelcomeStackNavigator = () => {
  return (
    <WelcomeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <WelcomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ animation: "slide_from_left" }}
      />
      <WelcomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ animation: "slide_from_right" }}
      />
      <WelcomeStack.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{ animation: "fade" }}
      />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeStackNavigator;
