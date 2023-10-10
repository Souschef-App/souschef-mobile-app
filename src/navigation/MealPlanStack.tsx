import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {MealplanScreen, RecipeScreen, TaskScreen} from '../screens';
import BottomTabs from './BottomTabs';
import {MealPlanNavigatorParamList} from './types';
import { EnterDescriptionScreen } from '../screens/subtask-generation/EnterDescriptionScreen';
import { TaskBreakDownResultScreen } from '../screens/subtask-generation/TaskBreakDownResultScreen';

const MealPlanStack = createNativeStackNavigator<MealPlanNavigatorParamList>();

const MealPlanNavigator = () => {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen
        name="MealPlan"
        component={MealplanScreen}
        options={{headerShown: false}}
      />
      <MealPlanStack.Screen
        name="EnterDescriptionScreen"
        component={EnterDescriptionScreen}
        options={{headerShown: false}}
      />
      <MealPlanStack.Screen
        name="TaskBreakDownResultScreen"
        component={TaskBreakDownResultScreen}
        options={{headerShown: false}}
      />
    </MealPlanStack.Navigator>
  );
};

export default MealPlanNavigator;
