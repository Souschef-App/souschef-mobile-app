import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { TaskScreen } from "../screens";
import FeedScreen from "../screens/task-execution/FeedScreen";
import ParticipantsScreen from "../screens/task-execution/ParticipantsScreen";
import BottomTabsNavigator from "./BottomTabs";
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
        name="Task"
        component={TaskScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Feed"
        component={FeedScreen}
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
