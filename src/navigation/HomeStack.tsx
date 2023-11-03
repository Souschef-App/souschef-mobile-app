import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ParticipantsScreen } from "../screens";
import BottomTabsNavigator from "./BottomTabs";
import TaskDrawerNavigator from "./TaskDrawer";
import { HomeStackNavigatorParamList } from "./types";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Tabs"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="TaskDrawer"
        component={TaskDrawerNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Participants"
        component={ParticipantsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
