import { create } from "zustand";
import {
  createRecipeBuilderSlice,
  RecipeBuilderSlice,
} from "./slices/recipeBuilderSlice";
import {
  createSessionSlice,
  SessionSlice,
} from "./slices/session/sessionSlice";
import { createUserSlice, UserSlice } from "./slices/userSlice";

export type StoreState = UserSlice & SessionSlice & RecipeBuilderSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createSessionSlice(...a),
  ...createRecipeBuilderSlice(...a),
}));

export default useStore;
