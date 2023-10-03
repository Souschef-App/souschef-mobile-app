// create a server connection;
import axios, {AxiosInstance} from 'axios';

const API_BASE_URL = 'http://api.com/api'; //change to real port

const AxiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include authentication tokens if needed
AxiosInstance.interceptors.request.use(
  config => {
    const authToken = 'your-auth-token'; // Replace with the actual token retrieval logic
    // Add the token to the request headers if it exists
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const sessionapi = {
  getFavoriteRecipes: () => AxiosInstance.get('/mealsession/facoriterecipes'),
  addFavoriteRecipe: (data: any) =>
    AxiosInstance.post('/mealsession/favoriterecipes', data),
  updateFavoriteRecipe: (id: number, data: any) =>
    AxiosInstance.put(`/mealsession/favoriterecipes/${id}`, data),
  deleteFavoriteRecipe: (id: number) =>
    AxiosInstance.delete(`/mealsession/favoriterecipes/${id}`),

  getMealPlans: () => AxiosInstance.get('/cooking/mealplans'),
  createMealPlan: (data: any) => AxiosInstance.post('/cooking/mealplans', data),
  updateMealPlan: (id: number, data: any) =>
    AxiosInstance.put(`/cooking/mealplans/${id}`, data),
  deleteMealPlan: (id: number) =>
    AxiosInstance.delete(`/cooking/mealplans/${id}`),

  getSessions: () => AxiosInstance.get('/cooking/sessions'),
  createSession: (data: any) => AxiosInstance.post('/cooking/sessions', data),
  updateSession: (id: number, data: any) =>
    AxiosInstance.put(`/cooking/sessions/${id}`, data),
  deleteSession: (id: number) =>
    AxiosInstance.delete(`/cooking/sessions/${id}`),
};
