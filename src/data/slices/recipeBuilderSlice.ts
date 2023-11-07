import { StateCreator } from "zustand";
import { StoreState } from "../store";
import { usePost } from "../../api/usePost";
import { ApiUrls } from "../../api/constants";
import { RecipeStep } from "../types/recipeStep";
import { RecipeStepDTO } from "../types/recipeStepDTO";
import { Task } from "../types";

export interface RecipeBuilderSlice {
  loading: boolean;
  enteredRecipe: string[] | null;
  brokenDownRecipe: Task[] | null;
  setEnteredRecipe: (recipe: string[]) => void;
  submitForBreakDown: () => void;
  updateRecipe: (ID: string, updatedRecipe: Task) => void;
}

const defaultRecipeStep: Task = {
  id: "0",
  title: "HII",
  description:
    "asdfsfasdfasfsf sasfasd asdfasd asd asdfasdf asd fasdfsadf sadfdsaf",
  ingredients: [],
  kitchenware: [],
  duration: 10,
  difficulty: 1,
  dependencies: [],
  priority: 0,
};

const defaultRecipeStep2: Task = {
  id: "0",
  title: "Chicken",
  description:
    "asdfsfasdfasfsf sasfasd asdfasd asd asdfasdf asd fasdfsadf sadfdsaf",
  ingredients: [],
  kitchenware: [],
  duration: 10,
  difficulty: 1,
  dependencies: [],
  priority: 0,
};

export const createRecipeBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  RecipeBuilderSlice
> = (set, get) => ({
  loading: false,
  enteredRecipe: null,
  brokenDownRecipe: [defaultRecipeStep, defaultRecipeStep2],
  setEnteredRecipe: (recipe: string[]) => {
    set({ enteredRecipe: recipe });
  },
  submitForBreakDown: async () => {
    let result: string = "";
    get().enteredRecipe?.map((rec: string) => {
      result += `${rec} \n`;
    });

    console.log(result);

    const [breakdownResult, error] = await usePost<string>(
      ApiUrls.subtaskBreakDown,
      {
        json: { recipe: result },
      }
    );

    if (error !== null || breakdownResult == null) return;

    console.log(breakdownResult);

    const removedExtraText = breakdownResult.slice(
      breakdownResult.indexOf("{"),
      breakdownResult.lastIndexOf("}") + 1
    );
    console.log(removedExtraText);
    try {
      const response = JSON.parse(removedExtraText);
      const tasks: Task[] = response.recipe;

      console.log(JSON.stringify(tasks));

      set({ brokenDownRecipe: tasks });
    } catch (error) {
      console.log(error);
    }
  },
  updateRecipe: (ID: string, updatedRecipe: Task) => {
    const list = get().brokenDownRecipe;

    if (list == null) return;

    const index = list.findIndex((item) => {
      return item.id === ID;
    });
    list.splice(index, 0, updatedRecipe);

    console.log("LIST " + list);

    set({ brokenDownRecipe: list });
  },
});
