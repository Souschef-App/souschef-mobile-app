import { create, StateCreator } from "zustand";
import { UserSlice, createUserSlice } from "./slices/userSlice";
import { TaskSlice, createTaskSlice } from "./slices/taskSlice";
import {
  createRecipeBuilderSlice,
  RecipeBuilderSlice,
} from "./slices/recipeBuilderSlice";

export type StoreState = UserSlice & TaskSlice & RecipeBuilderSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createTaskSlice(...a),
  ...createRecipeBuilderSlice(...a),
}));

export default useStore;
