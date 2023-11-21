// create a server connection;
import axios, {AxiosInstance} from 'axios';

const API_BASE_URL = 'http://192.168.2.86:8082/api';

let axiosInst: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

// Add a request interceptor to include authentication tokens if needed
axiosInst.interceptors.request.use(
  ( config: any ) => {
    const authToken = 'your-auth-token'; // Replace with the actual token retrieval logic
    // Add the token to the request headers if it exists
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  ( error: any ) => {
    return Promise.reject(error);
  },
);

export const sessionapi = {
  getAllRecipes: () => axiosInst.get('/recipe/public-recipes'),

  getFavoriteRecipes: (id: string) => axiosInst.get(`/favoriterecipes/${id}`),
  addFavoriteRecipe: (id: string, recipeId: string) =>
    axiosInst.post(`/favoriterecipes/${id}/${recipeId}`, {}),
  deleteFavoriteRecipe: (id: string, recipeId: string) =>
    axiosInst.delete(`/favoriterecipes/${id}/${recipeId}`),

  getMealPlans: () => axiosInst.get('/mealplans'),
  getMealPlan: (id: string) => axiosInst.get(`/mealplans/${id}`),
  createMealPlan: (data: any) => axiosInst.post('/mealplans', data),
  updateMealPlan: (id: string, data: any) =>
    axiosInst.put(`/mealplans/${id}`, data),
  deleteMealPlan: (id: string) =>
    axiosInst.delete(`/mealplans/${id}`),

  getMealPlanRecipes: (id: string) => axiosInst.get(`/mealplans/${id}/recipes`),
  addRecipeToMealPlan: (id: string, type: string, recipeId: string) => axiosInst.post(`/mealplans/${id}/recipes/${type}/${recipeId}`),
  deleteRecipeFromMealPlan: (id: string, recipeId: string) => axiosInst.delete(`/mealplans/${id}/recipes/${recipeId}`),

  getMealSessions: () => axiosInst.get('/mealsessions'),
  getMealSession: (id: string) => axiosInst.get(`/mealsessions/${id}`),
  joinMealSession: (code: string) => axiosInst.get(`/mealsessions/join/${code}`),
  createMealSession: (data: any) => axiosInst.post('/mealsessions', data),
  updateMealSession: (id: string, data: any) =>
    axiosInst.put(`/mealsessions/${id}`, data),
  deleteMealSession: (id: string) =>
    axiosInst.delete(`/mealsessions/${id}`),

  getMealSessionUsers: (id: string) => axiosInst.get(`/mealsessions/${id}/users`),
  addUserToMealSession: (id: string, userId: string) => axiosInst.post(`/mealsessions/${id}/users/${userId}`),
  deleteUserFromMealSession: (id: string, userId: string) => axiosInst.delete(`/mealsessions/${id}/users/${userId}`)
};
