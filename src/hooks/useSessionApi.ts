import { useState } from 'react';
import { sessionapi } from '../api/sessionapi'; // Ensure this is using the fetch API

export function useSessionApi() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  const processResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    return response.json();
  };

  const handleApiError = (error: Error) => {
    console.error('API call failed:', error.message);
    // Additional error handling logic added here
  };

  const fetchFavoriteRecipes = (userId: string) => {
    return sessionapi.getFavoriteRecipes(userId)
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };
  
  const fetchAllRecipes = () => {
    return sessionapi.getAllRecipes()
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  const createMealPlan = (data: any) => {
    return sessionapi.createMealPlan(data)
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  const fetchMealPlans = () => {
    sessionapi
      .getMealPlans()
      .then(response => processResponse(response as Response))
      .then(data => setMealPlans(data))
      .catch(handleApiError);
  };

  const addRecipeToMealPlan = (planId: string, type: string, recipeId: string) => {
    return sessionapi.addRecipeToMealPlan(planId, type, recipeId)
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  const getMealPlans = () => {
    return sessionapi.getMealPlans()
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  const createMealSession = (data: any) => {
    return sessionapi.createMealSession(data)
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  const getMealSessions = () => {
    return sessionapi.getMealSessions()
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  const joinMealSession = (code: string) => {
    return sessionapi.joinMealSession(code)
      .then(response => processResponse(response as Response))
      .catch(handleApiError);
  };

  return {
    fetchFavoriteRecipes,
    fetchAllRecipes,
    createMealPlan,
    fetchMealPlans,
    addRecipeToMealPlan,
    getMealPlans,
    createMealSession,
    getMealSessions,
    joinMealSession
    // Add other functions here as needed
  };
}
