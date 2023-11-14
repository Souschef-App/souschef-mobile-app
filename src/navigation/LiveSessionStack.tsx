import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import TaskDrawerNavigator from "./TaskDrawer";
import { LiveSessionNavigatorParamList } from "./types";
import { ConnectingScreen, ConnectedScreen } from "../screens";

const LiveSessionStack =
  createNativeStackNavigator<LiveSessionNavigatorParamList>();

const LiveSessionNavigator = () => {
  return (
    <LiveSessionStack.Navigator
      initialRouteName="Connecting"
      screenOptions={{ headerShown: false }}
    >
      <LiveSessionStack.Screen name="Connecting" component={ConnectingScreen} />
      <LiveSessionStack.Screen name="Connected" component={ConnectedScreen} />
      <LiveSessionStack.Screen name="Running" component={TaskDrawerNavigator} />
    </LiveSessionStack.Navigator>
  );
};

export default LiveSessionNavigator;
