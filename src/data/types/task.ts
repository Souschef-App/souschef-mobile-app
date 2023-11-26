import { DIFFICULTY } from "./enum";
import Dependency from "./dependency";
import Kitchenware from "./kitchenware";
import { Ingredient } from "./ingredient";

interface Task {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: DIFFICULTY;
  dependencies: Dependency[];
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
  isBackground: boolean;
}

export default Task;
