import { StateCreator } from "zustand";
import { StoreState } from "../store";
import { COOKING_UNIT, DIFFICULTY, Task } from "../types";

export interface TaskSlice {
  task: Task | null;
}

const defaultTask: Task = {
  id: "",
  title: "Chop Carrots",
  description: "Chop the carrots into thin slices",
  duration: 10,
  difficulty: DIFFICULTY.Medium,
  points: 0,
  ingredients: [
    { id: "", name: "Carrot", quantity: 2, unit: COOKING_UNIT.None },
  ],
  kitchenware: [
    { id: "", name: "Knife", quantity: 1 },
    { id: "", name: "Cutting board", quantity: 1 },
  ],
  order: -1,
  dependencies: [],
  finished: false, // Remove?
  assignee: "", // Remove?
};

export const createTaskSlice: StateCreator<StoreState, [], [], TaskSlice> = (
  set,
  get
) => ({
  task: defaultTask,
});
