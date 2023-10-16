import { StateCreator } from "zustand";
import { StoreState } from "../store";
import { usePost } from "../../api/usePost";
import { ApiUrls } from "../../api/constants";
import { RecipeStep } from "../types/recipeStep";

export interface RecipeBuilderSlice {
  loading: boolean;
  enteredRecipe: string[] | null;
  brokenDownRecipe: RecipeStep[] | null;
  setEnteredRecipe: (recipe: string[]) => void;
  submitForBreakDown: () => void;
}

export const createRecipeBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  RecipeBuilderSlice
> = (set, get) => ({
  loading: false,
  enteredRecipe: null,
  brokenDownRecipe: null,
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

    try {
      const response = JSON.parse(breakdownResult);
      const tasks: RecipeStep[] = response.steps;

      set({ brokenDownRecipe: tasks });
    } catch (error) {
      console.log(error);
    }
  },
});
