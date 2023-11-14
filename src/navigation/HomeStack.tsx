import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { QRCodeScreen } from "../screens";
import BottomTabsNavigator from "./BottomTabs";
import LiveSessionNavigator from "./LiveSessionStack";
import { HomeStackNavigatorParamList } from "./types";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Tabs" component={BottomTabsNavigator} />
      <HomeStack.Screen name="QRCode" component={QRCodeScreen} />
      <HomeStack.Screen name="LiveSession" component={LiveSessionNavigator} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
