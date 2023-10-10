import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
// import { RecipeScreen, TaskScreen } from "../screens";
import BottomTabs from "./BottomTabs";
import { HomeStackNavigatorParamList } from "./types";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <HomeStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Task"
        component={TaskScreen}
        options={{ headerShown: false }}
      /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
