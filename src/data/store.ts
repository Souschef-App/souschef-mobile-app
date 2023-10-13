import { create, StateCreator } from "zustand";
import { UserSlice, createUserSlice } from "./slices/userSlice";
import { TaskSlice, createTaskSlice } from "./slices/taskSlice";

export type StoreState = UserSlice & TaskSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createTaskSlice(...a),
}));

export default useStore;
