import { OCCASION_TYPE } from "./enum";
import Recipe from "./recipe";

interface MealPlan {
  id: string;
  date: number;
  name: string;
  hostId: string;
  occasionType: OCCASION_TYPE;
  recipes: Recipe[];
}

export default MealPlan;
