import { OCCASION_TYPE } from "./enum";
import Recipe from "./recipe";
import User from "./user";

interface MealPlan {
  id: string;
  name: string;
  date: number;
  occasionType: OCCASION_TYPE;
  recipes: Recipe[];
  guests: User[];
  host: User;
}

export default MealPlan;
