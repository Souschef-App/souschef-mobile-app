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
  updateRecipe: (ID: number, updatedRecipe: RecipeStep) => void;
}

const defaultRecipeStep : RecipeStep = {
  ID: 0,
  Title: "HII",
  Description: "asdfsfasdfasfsf sasfasd asdfasd asd asdfasdf asd fasdfsadf sadfdsaf",
  Ingredients: ["chicken"],
  Kitchenware: ["pan"],
  Duration: 10,
  Difficulty: 1,
  Dependencies: []
}

export const createRecipeBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  RecipeBuilderSlice
> = (set, get) => ({
  loading: false,
  enteredRecipe: null,
  brokenDownRecipe: [defaultRecipeStep],
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
  updateRecipe: (ID: number, updatedRecipe: RecipeStep) => {
    const list = get().brokenDownRecipe;

    if (list == null) return;

    const index = list.findIndex((item) => {
      return item.ID === ID;
    });
    list.splice(index, 0, updatedRecipe);

    console.log("LIST " + list);

    set({ brokenDownRecipe: list });
  },
});
