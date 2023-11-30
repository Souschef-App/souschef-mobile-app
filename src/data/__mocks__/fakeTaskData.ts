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
      quantity: { whole: 1, numerator: 0, denominator: 0 },
      unit: COOKING_UNIT.None,
    },
    {
      id: "ingredient-124",
      name: "Water",
      quantity: { whole: 0, numerator: 1, denominator: 3 },
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
