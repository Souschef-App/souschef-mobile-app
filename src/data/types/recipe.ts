import { Task } from "react-native";
import { DIFFICULTY } from "./enum";
import Ingredient from "./ingredient";
import Kitchenware from "./kitchenware";

interface Recipe {
  id: string;
  name: string;
  date: number;
  duration: number;
  difficulty: DIFFICULTY;
  serves: number;
  ownerId: string | null;
  favorites: number;
  tasks: Task[]; // Change to list of task
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
}

export default Recipe;

// export const defaultRecipe: Recipe = {
//   id: "",
//   name: "Default Recipe",
//   date: 0,
//   duration: 0,
//   difficulty: DIFFICULTY.Easy,
//   serves: 0,
//   ownerId: null,
//   favorites: 0,
//   tasks: [], // Change to list of task
//   ingredients: [], // Change to list of ingredients
//   kitchenware: [], // Change to list of kitchenware
// };
