import {SetStateAction, useEffect, useState} from 'react';
import {sessionapi} from '../api/sessionapi'; // Import your session API functions

export function useSessionApi() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  // Fetch favorite recipes and update state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchFavoriteRecipes = (userId: string) => {
    return sessionapi.getFavoriteRecipes(userId)
  };
  
  const fetchAllRecipes = () => {
    return sessionapi.getAllRecipes()
  };

  const createMealPlan = (data: any) => {
    return sessionapi.createMealPlan(data);
  }

  // Fetch meal plans and update state
  const fetchMealPlans = () => {
    sessionapi
      .getMealPlans()
      .then((response: {data: SetStateAction<any[]>}) => {
        setMealPlans(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching meal plans:', error);
      });
  };

  const addRecipeToMealPlan = (planId: string, type: string, recipeId: any) => {
    return sessionapi.addRecipeToMealPlan(planId, type, recipeId);
  }

  const getMealPlans = () => {
    return sessionapi.getMealPlans();
  }

  const createMealSession = (data: any) => {
    return sessionapi.createMealSession(data);
  }

  const getMealSessions = () => {
    return sessionapi.getMealSessions();
  }

  return {
    fetchFavoriteRecipes,
    fetchAllRecipes,
    createMealPlan,
    addRecipeToMealPlan,
    createMealSession,
    getMealPlans,
    getMealSessions
    // Add other functions here as needed
  };
}
