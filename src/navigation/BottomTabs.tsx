import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Icon } from "../components";
import { CalendarScreen, HomeScreen, JoinScreen } from "../screens";
import HomeStackNavigator from "./HomeStack";
import MealPlanNavigator from "./MealPlanStack";
import { BottomTabNavigatorParamList } from "./types";

const BottomTabs = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#2e9dfb",
        tabBarInactiveTintColor: "#b3bac0",
        tabBarStyle: {
          // Seamless transition (color)
          borderTopWidth: 0,
          // Android
          elevation: 0,
          // iOS
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon("home"),
        }}
      />
      <BottomTabs.Screen
        name="Mealplan"
        component={MealPlanNavigator}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon("meal"),
        }}
      />
      <BottomTabs.Screen
        name="Join"
        component={JoinScreen}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon("qr"),
        }}
      />
      <BottomTabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: makeTabBarIcon("calendar"),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const makeTabBarIcon = (iconName: string) => {
  return ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }) => <Icon name={iconName} color={color} size={size} />;
};

export default BottomTabsNavigator;
