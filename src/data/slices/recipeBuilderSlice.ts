import { StateCreator } from "zustand";
import { StoreState } from "../store";
import jsonRequest from "../../api/requests";
import { ApiUrls } from "../../api/constants";
import { DIFFICULTY, Ingredient, Kitchenware, Recipe, Task } from "../types";
import Dependency from "data/types/dependency";

export enum BeforeOrAfter {
  Before,
  After,
}

export interface RecipeBuilderSlice {
  loading: boolean;

  activeIndex: number;
  setActiveIndex: (state: number) => void;
  currentTask: Task | null;
  currentIngredientIndex: number;
  currentKitchenwareIndex: number;

  enteredRecipe: string[] | null;
  brokenDownRecipe: Task[] | null;
  saveRecipeError: string | null;
  saveRecipeSuccess: string | null;

  setEnteredRecipe: (recipe: string[]) => void;
  submitForBreakDown: () => void;
  submitForRetryTask: () => void;
  updateRecipeTask: (updatedRecipe: Task) => void;
  saveRecipe: (name: string) => void;

  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateDifficulty: (title: DIFFICULTY) => void;
  updateDuration: (duration: number) => void;
  updateIngredient: (ingredient: Ingredient, index: number) => void;
  updateKitchenware: (kitchenware: Kitchenware, index: number) => void;

  removeIngredient: (task: Task, index: number | undefined) => void;
  removeKitchenware: (task: Task, index: number | undefined) => void;
  removeDependency: (task: Task, index: number | undefined) => void;

  addIngredient: (task: Task, ingredient: Ingredient) => void;
  addKitchenware: (task: Task, kitchenware: Kitchenware) => void;
  addDependency: (task: Task, dependency: Dependency) => void;

  addBlankCard: (beforeOrAfter: BeforeOrAfter) => void;
}

export const createRecipeBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  RecipeBuilderSlice
> = (set, get) => ({
  loading: false,
  activeIndex: 0,
  currentTask: null,
  currentIngredientIndex: 0,
  currentKitchenwareIndex: 0,

  enteredRecipe: [],
  brokenDownRecipe: [],
  saveRecipeError: null,
  saveRecipeSuccess: null,
  setActiveIndex: (num: number) => {
    let list = get().brokenDownRecipe;

    set({ activeIndex: num });
    set({ currentTask: list ? list[num] : null });
  },
  setEnteredRecipe: (recipe: string[]) => {
    const list = get().enteredRecipe;

    list?.push(...recipe);

    set({ enteredRecipe: list });
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

    set({ brokenDownRecipe: breakdownResult });
  },
  submitForRetryTask: async () => {
    const recipe = get().brokenDownRecipe;
    const task = recipe ? recipe[get().activeIndex] : null;

    if (task == null) return;

    const [taskResult, error] = await jsonRequest.post<Task>(
      ApiUrls.subtaskRetry,
      {
        json: task,
      }
    );

    if (error !== null || taskResult == null) return;

    get().updateRecipeTask(taskResult);
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
  updateTitle: (title: string) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.title = title;
    get().updateRecipeTask(cloneTask);
  },

  updateDescription: (description: string) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.description = description;
    get().updateRecipeTask(cloneTask);
  },

  updateDifficulty: (difficulty: DIFFICULTY) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.difficulty = difficulty;
    get().updateRecipeTask(cloneTask);
  },

  updateDuration: (duration: number) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.duration = duration;
    get().updateRecipeTask(cloneTask);
  },
  updateIngredient: (ingredient: Ingredient, index: number) => {
    const cloneTask = get().currentTask;
    if (!cloneTask) return;

    cloneTask.ingredients[index] = ingredient;
    get().updateRecipeTask(cloneTask);
  },
  updateKitchenware: (kitchenware: Kitchenware, index: number) => {
    const cloneTask = get().currentTask;

    if (!cloneTask) return;

    cloneTask.kitchenware[index] = kitchenware;
    get().updateRecipeTask(cloneTask);
  },
  removeIngredient: (task: Task, index: number | undefined) => {
    if (!task || index == undefined) return;

    task.ingredients.splice(index, 1);
    get().updateRecipeTask(task);
  },
  removeKitchenware: (task: Task, index: number | undefined) => {
    if (!task || index == undefined) return;
    task.kitchenware.splice(index, 1);
    get().updateRecipeTask(task);
  },
  removeDependency: (task: Task, index: number | undefined) => {
    if (!task || index == undefined) return;
    task.dependencies.splice(index, 1);
    get().updateRecipeTask(task);
  },
  addIngredient: (task: Task, ingredient: Ingredient) => {
    if (!task) return;
    task.ingredients.push(ingredient);
    get().updateRecipeTask(task);
  },
  addKitchenware: (task: Task, kitchenware: Kitchenware) => {
    if (!task) return;
    task.kitchenware.push(kitchenware);
    get().updateRecipeTask(task);
  },
  addDependency: (task: Task, dependency: Dependency) => {
    if (!task) return;
    task.dependencies.push(dependency);
    get().updateRecipeTask(task);
  },
  addBlankCard: (beforeOrAfter: BeforeOrAfter) => {
    console.log("addBlankCard " + beforeOrAfter);
    const recipeClone = get().brokenDownRecipe;
    const index = get().activeIndex;
    const newTask: Task = {
      id: "",
      title: "",
      description: "",
      duration: 0,
      difficulty: DIFFICULTY.Easy,
      dependencies: [],
      ingredients: [],
      kitchenware: [],
      isBackground: false,
    };

    if (recipeClone == null) return;

    if (beforeOrAfter == BeforeOrAfter.Before) {
      console.log("Before " + recipeClone.length);
      recipeClone.splice(index - 1, 0, newTask);
      console.log("Before " + recipeClone.length);
    } else if (beforeOrAfter == BeforeOrAfter.After) {
      recipeClone.splice(index, 0, newTask);
    }

    set({ brokenDownRecipe: recipeClone });
  },
});
