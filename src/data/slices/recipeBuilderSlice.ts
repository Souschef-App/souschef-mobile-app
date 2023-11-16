import { StateCreator } from "zustand";
import { StoreState } from "../store";
import jsonRequest from "../../api/requests";
import { ApiUrls } from "../../api/constants";
import { Recipe, Task } from "../types";

export interface RecipeBuilderSlice {
  loading: boolean;
  enteredRecipe: string[] | null;
  brokenDownRecipe: Task[] | null;
  saveRecipeError: string | null;
  saveRecipeSuccess: string | null;
  setEnteredRecipe: (recipe: string[]) => void;
  submitForBreakDown: () => void;
  updateRecipe: (ID: string, updatedRecipe: Task) => void;
  saveRecipe: (name: string) => void;
}

export const createRecipeBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  RecipeBuilderSlice
> = (set, get) => ({
  loading: false,
  enteredRecipe: null,
  brokenDownRecipe: [],
  saveRecipeError: null,
  saveRecipeSuccess: null,
  setEnteredRecipe: (recipe: string[]) => {
    set({ enteredRecipe: recipe });
  },
  submitForBreakDown: async () => {
    let result: string = "";
    get().enteredRecipe?.map((rec: string) => {
      result += `${rec} \n`;
    });

    console.log(result);

    const [breakdownResult, error] = await jsonRequest.post<Task[]>(
      ApiUrls.subtaskBreakDown,
      {
        json: { recipe: result },
      }
    );

    if (error !== null || breakdownResult == null) return;

    console.log("BREAKDOWN RESULT" + JSON.stringify(breakdownResult));

    // console.log(JSON.stringify(breakdownResult.tasks));
    set({ brokenDownRecipe: breakdownResult });
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
  saveRecipe: async (name: string) => {
    console.log("saveRecipe");
    const tasks = get().brokenDownRecipe;
    const userID = get().user?.id;

    if (tasks != null && name != null && userID != null) {
      const recipe: Recipe = {
        id: "",
        name: name,
        date: 0,
        duration: 0,
        difficulty: 0,
        serves: 0,
        favorites: 0,
        tasks: tasks,
        ingredients: [],
        kitchenware: [],
        ownerId: userID,
      };

      const [res, error] = await jsonRequest.post<any>(ApiUrls.saveRecipe, {
        json: recipe,
      });

      if (error) {
        set({ saveRecipeError: error });
      } else {
        set({ saveRecipeSuccess: "Success" });
      }
    } else {
      set({ saveRecipeError: "No Recipe" });
    }
  },
});
