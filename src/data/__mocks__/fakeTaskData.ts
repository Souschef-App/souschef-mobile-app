import {
  COOKING_UNIT,
  DIFFICULTY,
  Recipe,
  SKILL_LEVEL,
  Task,
  User,
} from "../types";

const fakeTask: Task = {
  id: "task-123",
  title: "Prepare Baguette",
  description: "Split the French baguette in half lengthwise.",
  duration: 10,
  difficulty: DIFFICULTY.Medium,
  priority: 0,
  dependencies: [],
  ingredients: [
    {
      id: "ingredient-123",
      name: "French Baguette",
      quantity: 1,
      unit: COOKING_UNIT.None,
    },
    {
      id: "ingredient-124",
      name: "Water",
      quantity: 0.33,
      unit: COOKING_UNIT.Cups,
    },
  ],
  kitchenware: [
    {
      id: "kw-123",
      name: "Knife",
      quantity: 1,
    },
  ],
};

export default fakeTask;
