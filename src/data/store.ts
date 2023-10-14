import { create } from "zustand";
import {
  createSessionSlice,
  SessionSlice,
} from "./slices/session/sessionSlice";
import { createUserSlice, UserSlice } from "./slices/userSlice";

export type StoreState = UserSlice & SessionSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createSessionSlice(...a),
}));

export default useStore;
