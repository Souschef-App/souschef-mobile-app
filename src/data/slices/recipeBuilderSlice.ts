import { StateCreator } from "zustand";
import { StoreState } from "../store";
import { usePost } from "../../api/usePost";
import { ApiUrls } from "../../api/constants";
import { RecipeStep } from "../types/recipeStep";
import { RecipeStepDTO } from "../types/recipeStepDTO";

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

    const removedExtraText = breakdownResult.slice(
      breakdownResult.indexOf("{"),
      breakdownResult.lastIndexOf("}") + 1
    );
    console.log(removedExtraText);
    try {
      const response = JSON.parse(removedExtraText);
      const tasks: RecipeStepDTO[] = response.recipe;

      const subTasks: RecipeStep[] = [];

      tasks.map((item, index) => {
        const step: RecipeStep = {
          ID: index,
          ...item,
        };
        subTasks.push(step);
      });

      console.log(JSON.stringify(subTasks));

      set({ brokenDownRecipe: subTasks });
    } catch (error) {
      console.log(error);
    }
  },
});
