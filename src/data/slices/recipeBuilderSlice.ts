import { StateCreator } from "zustand";
import { StoreState } from "../store";
import jsonRequest from "../../api/requests";
import { ApiUrls } from "../../api/constants";
import { DIFFICULTY, Recipe, Task } from "../types";

export interface RecipeBuilderSlice {
  loading: boolean;

  activeIndex: number;
  setActiveIndex: (state: number) => void;
  currentTask: Task | null;
  isEditTItleVisible: boolean;
  isEditDescriptionVisible: boolean;
  isEditRatingVisible: boolean;
  isEditDurationVisible: boolean;
  isEditIngredientsVisible: boolean;
  isEditKitchenwareVisible: boolean;
  isEditDependenciesVisible: boolean;

  setIsEditTItleVisible: (state: boolean) => void;
  setIsEditDescriptionVisible: (state: boolean) => void;
  setIsEditRatingVisible: (state: boolean) => void;
  setIsEditDurationVisible: (state: boolean) => void;
  setIsEditIngredientsVisible: (state: boolean) => void;
  setIsEditKitchenwareVisible: (state: boolean) => void;
  setIsEditDependencyVisible: (state: boolean) => void;

  enteredRecipe: string[] | null;
  brokenDownRecipe: Task[] | null;
  saveRecipeError: string | null;
  saveRecipeSuccess: string | null;

  setEnteredRecipe: (recipe: string[]) => void;
  submitForBreakDown: () => void;
  updateRecipeTask: (updatedRecipe: Task) => void;
  saveRecipe: (name: string) => void;

  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateDifficulty: (title: DIFFICULTY) => void;
  updateDuration: (duration: number) => void;
}

export const createRecipeBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  RecipeBuilderSlice
> = (set, get) => ({
  loading: false,
  currentTask: null,
  activeIndex: 0,
  isEditTItleVisible: false,
  isEditDescriptionVisible: false,
  isEditRatingVisible: false,
  isEditDurationVisible: false,
  isEditIngredientsVisible: false,
  isEditKitchenwareVisible: false,
  isEditDependenciesVisible: false,

  enteredRecipe: null,
  brokenDownRecipe: [],
  saveRecipeError: null,
  saveRecipeSuccess: null,
  setActiveIndex: (num: number) => {
    console.trace("SET ACTIVE INDEX ", num);
    let list = get().brokenDownRecipe;
    set({ activeIndex: num });
    set({ currentTask: list ? list[num] : null });
  },
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
  updateRecipeTask: (updatedTask: Task) => {
    const list = get().brokenDownRecipe;

    if (list == null) return;

    const index = list.findIndex((item) => {
      return item.id === updatedTask.id;
    });

    list.splice(index, 1, updatedTask);

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
  setIsEditTItleVisible: (state: boolean) => {
    set({ isEditTItleVisible: state });
  },
  setIsEditDescriptionVisible: (state: boolean) => {
    set({ isEditDescriptionVisible: state });
  },
  setIsEditRatingVisible: (state: boolean) => {
    set({ isEditRatingVisible: state });
  },
  setIsEditDurationVisible: (state: boolean) => {
    set({ isEditDurationVisible: state });
  },
  setIsEditIngredientsVisible: (state: boolean) => {
    set({ isEditIngredientsVisible: state });
  },
  setIsEditKitchenwareVisible: (state: boolean) => {
    set({ isEditKitchenwareVisible: state });
  },
  setIsEditDependencyVisible: (state: boolean) => {
    set({ isEditDependenciesVisible: state });
  },
  updateTitle: (title: string) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.title = title;
    get().updateRecipeTask(cloneTask);
    get().setIsEditTItleVisible(false);
  },

  updateDescription: (description: string) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.description = description;
    get().updateRecipeTask(cloneTask);
    get().setIsEditDescriptionVisible(false);
  },

  updateDifficulty: (difficulty: DIFFICULTY) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.difficulty = difficulty;
    get().updateRecipeTask(cloneTask);
    get().setIsEditRatingVisible(false);
  },

  updateDuration: (duration: number) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.duration = duration;
    get().updateRecipeTask(cloneTask);
    get().setIsEditDurationVisible(false);
  },

  // updateIngredients:  () =>{
  //   const cloneTask = task;
  //   cloneTask.ingredients = taskIngredients
  //   updateRecipe(cloneTask)
  //   setIsEditIngredientsVisible(false);
  // },

  // updateKitchenware:  () =>{

  //   const cloneTask = task;
  //   cloneTask.kitchenware = taskKitchenware
  //   updateRecipe(cloneTask)
  //   setIsEditKitchenwareVisible(false);
  // }
});
