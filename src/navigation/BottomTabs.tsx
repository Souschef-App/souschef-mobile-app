import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Icon } from "../components";
import { CalendarScreen, HomeScreen } from "../screens";
import JoinNavigator from "./JoinStack";
import MealPlanNavigator from "./MealPlanStack";
import { BottomTabNavigatorParamList } from "./types";
import { ThemeContext } from "../contexts/AppContext";

const BottomTabs = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabsNavigator = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.highlight,
        tabBarInactiveTintColor: theme.colors.textDisabled,
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
          tabBarIcon: makeTabBarIcon("home"),
        }}
      />
      <BottomTabs.Screen
        name="Mealplan"
        component={MealPlanNavigator}
        options={{
          tabBarIcon: makeTabBarIcon("meal"),
        }}
      />
      <BottomTabs.Screen
        name="Join"
        component={JoinNavigator}
        options={{
          tabBarIcon: makeTabBarIcon("qr"),
          unmountOnBlur: true,
        }}
      />
      <BottomTabs.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
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
