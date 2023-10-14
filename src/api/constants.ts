const baseUrl = `http://192.168.2.16:5000/api`;
const user = `${baseUrl}/user`;
const recipe = `${baseUrl}/recipe`;
const cookingSession = `${baseUrl}/cookingsession`;
const liveCookingSession = `${baseUrl}/live-cookingsession`;

export const ApiUrls = {
  login: `${user}/login`,
  register: `${user}/register`,
  publicRecipes: `${recipe}/public-recipes`,
  getTodaysMealPlans: `${cookingSession}/get-todays-cooking-session-by-user`,
  startMealPlan: `${liveCookingSession}/start`,
  joinMealPlan: `${liveCookingSession}/join`,
  getTask: `${liveCookingSession}/get-task`,
  completeTask: `${liveCookingSession}/complete-task`,
  rerollTask: `${liveCookingSession}/re-roll-task`,
};
