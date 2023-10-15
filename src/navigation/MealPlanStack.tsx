import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { MealplanScreen } from "../screens";
import { EnterDescriptionScreen } from "../screens/subtask-generation/EnterDescriptionScreen";
import { TaskBreakDownResultScreen } from "../screens/subtask-generation/TaskBreakDownResultScreen";
import { MealPlanNavigatorParamList } from "./types";
import DateScreen from "../screens/DateScreen";
import TimeScreen from "../screens/TimeScreen";

const MealPlanStack = createNativeStackNavigator<MealPlanNavigatorParamList>();

const MealPlanNavigator = () => {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen
        name="MealPlan"
        component={MealplanScreen}
        options={{ headerShown: false }}
      />
      <MealPlanStack.Screen
        name="EnterDescriptionScreen"
        component={EnterDescriptionScreen}
        options={{ headerShown: false }}
      />
      <MealPlanStack.Screen
        name="TaskBreakDownResultScreen"
        component={TaskBreakDownResultScreen}
        options={{ headerShown: false }}
      />
      <MealPlanStack.Screen
        name="DateScreen"
        component={DateScreen}
        options={{ headerShown: false }}
      />
    </MealPlanStack.Navigator>
  );
};

export default MealPlanNavigator;
