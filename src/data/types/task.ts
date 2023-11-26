import { DIFFICULTY, TASK_STATUS } from "./enum";
import Dependency from "./dependency";
import Ingredient from "./ingredient";
import Kitchenware from "./kitchenware";

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
