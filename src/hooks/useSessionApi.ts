import {SetStateAction, useEffect, useState} from 'react';
import {sessionapi} from '../api/sessionapi'; // Import your session API functions

export function useSessionApi() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]);
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  // Fetch favorite recipes and update state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchFavoriteRecipes = () => {
    sessionapi
      .getFavoriteRecipes()
      .then(response => {
        setFavoriteRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching favorite recipes:', error);
      });
  };

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
  // Fetch sessions and update state
  const fetchSessions = () => {
    sessionapi
      .getSessions()
      .then((response: {data: SetStateAction<any[]>}) => {
        setSessions(response.data);
      })
      .catch((error: any) => {
        console.error('Error fetching sessions:', error);
      });
  };

  // Create a new session
  const createSession = (newSession: any) => {
    sessionapi
      .createSession(newSession)
      .then((response: {data: any}) => {
        // Handle success, update state, or perform other actions
        console.log('Created Session:', response.data);
      })
      .catch((error: any) => {
        console.error('Error creating session:', error);
      });
  };

  // add more functions for other API endpoints as needed

  // Use useEffect to automatically fetch data when the component using this hook mounts
  useEffect(() => {
    fetchFavoriteRecipes();
    fetchMealPlans();
    fetchSessions();
  }, [fetchFavoriteRecipes]);

  return {
    favoriteRecipes,
    mealPlans,
    sessions,
    createSession, // Export the createSession function
    // Add other functions here as needed
  };
}
