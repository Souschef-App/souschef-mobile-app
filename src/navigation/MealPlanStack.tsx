import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { CalendarScreen, MealplanScreen } from "../screens";
import { EnterRecipeStepsScreen } from "../screens/subtask-generation/EnterRecipeStepsScreen";
import { TaskBreakDownResultScreen } from "../screens/subtask-generation/TaskBreakDownResult/TaskBreakDownResultScreen";
import { MealPlanNavigatorParamList } from "./types";
import DateScreen from "../screens/DateScreen";
import TimeScreen from "../screens/TimeScreen";
import MealNameScreen from "../screens/MealNameScreen";
import RecipeSelectorScreen from "../screens/RecipeSelectorScreen";
import FavoriteScreen from "../screens/tabs/FavoriteScreen";
import { EnterRecipeIngredientsScreen } from "../screens/subtask-generation/EnterRecipeIngredientsScreen";

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
        name="EnterRecipeStepsScreen"
        component={EnterRecipeStepsScreen}
        options={{ headerShown: false }}
      />
      <MealPlanStack.Screen
        name="EnterRecipeIngredientsScreen"
        component={EnterRecipeIngredientsScreen}
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
       <MealPlanStack.Screen
        name="TimeScreen"
        component={TimeScreen}
        options={{ headerShown: false }} 
      />

      <MealPlanStack.Screen
        name="MealNameScreen"
        component={MealNameScreen}
        options={{ headerShown: false }}
      />

      <MealPlanStack.Screen
      name="RecipeSelectorScreen"
      component={RecipeSelectorScreen}
      options={{ headerShown: false }}
      />

      <MealPlanStack.Screen
      name="FavoriteScreen"
      component={FavoriteScreen}
      options={{ headerShown: false }}
      />

      <MealPlanStack.Screen
      name="CalendarScreen"
      component={CalendarScreen}
      options={{ headerShown: false }}
      />  

      
    </MealPlanStack.Navigator>
  );
};

export default MealPlanNavigator;
