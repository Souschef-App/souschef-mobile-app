import { COOKING_UNIT, DIFFICULTY, SessionTask, TASK_STATUS } from "../types";

const fakeSessionTask: SessionTask = {
  id: "task-123",
  title: "Prepare Baguette",
  description: "Split the French baguette in half lengthwise.",
  duration: 10,
  difficulty: DIFFICULTY.Medium,
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
  isBackground: false,
  status: TASK_STATUS.Unassigned,
};

export default fakeSessionTask;
