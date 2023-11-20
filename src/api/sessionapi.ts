const API_BASE_URL = 'http://192.168.2.86:8082/api';

// Helper function to perform fetch requests
const fetchWithTimeout = (url: string, options: RequestInit, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    ),
  ]);
};

const createRequest = (method: string, path: string, data: any = null) => {
  const authToken = 'your-auth-token'; // Replace with the actual token retrieval logic

  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetchWithTimeout(`${API_BASE_URL}${path}`, options);
};

export const sessionapi = {
  getAllRecipes: () => createRequest('GET', '/recipe/public-recipes'),

  getFavoriteRecipes: (id: string) => createRequest('GET', `/favoriterecipes/${id}`),
  addFavoriteRecipe: (id: string, recipeId: string) =>
    createRequest('POST', `/favoriterecipes/${id}/${recipeId}`),
  deleteFavoriteRecipe: (id: string, recipeId: string) =>
    createRequest('DELETE', `/favoriterecipes/${id}/${recipeId}`),

  getMealPlans: () => createRequest('GET', '/mealplans'),
  getMealPlan: (id: string) => createRequest('GET', `/mealplans/${id}`),
  createMealPlan: (data: any) => createRequest('POST', '/mealplans', data),
  updateMealPlan: (id: string, data: any) =>
    createRequest('PUT', `/mealplans/${id}`, data),
  deleteMealPlan: (id: string) =>
    createRequest('DELETE', `/mealplans/${id}`),

  getMealPlanRecipes: (id: string) => createRequest('GET', `/mealplans/${id}/recipes`),
  addRecipeToMealPlan: (id: string, type: string, recipeId: string) =>
    createRequest('POST', `/mealplans/${id}/recipes/${type}/${recipeId}`),
  deleteRecipeFromMealPlan: (id: string, recipeId: string) =>
    createRequest('DELETE', `/mealplans/${id}/recipes/${recipeId}`),

  getMealSessions: () => createRequest('GET', '/mealsessions'),
  getMealSession: (id: string) => createRequest('GET', `/mealsessions/${id}`),
  joinMealSession: (code: string) =>
    createRequest('GET', `/mealsessions/join/${code}`),
  createMealSession: (data: any) =>
    createRequest('POST', '/mealsessions', data),
  updateMealSession: (id: string, data: any) =>
    createRequest('PUT', `/mealsessions/${id}`, data),
  deleteMealSession: (id: string) =>
    createRequest('DELETE', `/mealsessions/${id}`),

  getMealSessionUsers: (id: string) =>
    createRequest('GET', `/mealsessions/${id}/users`),
  addUserToMealSession: (id: string, userId: string) =>
    createRequest('POST', `/mealsessions/${id}/users/${userId}`),
  deleteUserFromMealSession: (id: string, userId: string) =>
    createRequest('DELETE', `/mealsessions/${id}/users/${userId}`),
};
