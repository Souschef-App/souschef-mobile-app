import { DIFFICULTY } from "./enum";
import Ingredient from "./ingredient";
import Kitchenware from "./kitchenware";

interface Task {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
  duration: number;
  difficulty: DIFFICULTY;
  order: number;
  dependencies: number[];
  points: number;
  finished: boolean;
  assignee: string; // Change to User
}

export default Task;

// export const defaultTask: Task = {
//   id: "",
//   title: "Default Task",
//   description: "Something went wrong",
//   ingredients: [], // Change to list of ingredients
//   kitchenware: [], // Change to list of kitchenware
//   duration: 0,
//   difficulty: DIFFICULTY.Easy,
//   order: -1,
//   dependencies: [],
//   points: 0,
//   finished: false,
//   assignee: "", // Change to User
// };
