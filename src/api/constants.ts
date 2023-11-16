import { API_BASE } from "@env";

console.log(API_BASE);

const baseUrl = `http://${API_BASE}:5000/api`;
const user = `${baseUrl}/user`;
const recipe = `${baseUrl}/recipe`;
const cookingSession = `${baseUrl}/cookingsession`;
const liveSession = `${baseUrl}/live-session`;
const subTaskGeneration = `${baseUrl}/subtask`;

export const ApiUrls = {
  login: `${user}/login`,
  register: `${user}/register`,
  publicRecipes: `${recipe}/public-recipes`,
  getTodaysMealPlans: `${cookingSession}/get-todays-cooking-session-by-user`,
  getLiveSession: `${liveSession}/get-session`,
  startSubTaskSession: `${subTaskGeneration}/session`,
  subtaskBreakDown: `${subTaskGeneration}/request`,
  saveRecipe: `${recipe}/add-recipe`,
};
