import { API_BASE } from "@env";

const baseUrl = `http://${API_BASE}:5000/api`;
const user = `${baseUrl}/user`;
const recipe = `${baseUrl}/recipe`;
const cookingSession = `${baseUrl}/cookingsession`;
const liveCookingSession = `${baseUrl}/live-cookingsession`;
const subTaskGeneration = `${baseUrl}/subtask`;

export const ApiUrls = {
  login: `${user}/login`,
  register: `${user}/register`,
  publicRecipes: `${recipe}/public-recipes`,
  getTodaysMealPlans: `${cookingSession}/get-todays-cooking-session-by-user`,
  getLiveSessionIP: `${liveCookingSession}/get-ip`,
  startSubTaskSession: `${subTaskGeneration}/session`,
  subtaskBreakDown: `${subTaskGeneration}/request`,
};
