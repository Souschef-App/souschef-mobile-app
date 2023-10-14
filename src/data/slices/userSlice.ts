import { StateCreator } from "zustand";
import { ApiUrls } from "../../api/constants";
import { User } from "../types";
import { usePost } from "../../api/usePost";
import { StoreState } from "../store";

export interface UserSlice {
  user: User | null;
  userLoading: boolean;
  userError: string | null;
  clearUserError: () => void;
  login: ({}: { email: string; password: string }) => Promise<void>;
  register: ({}: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => Promise<void>;
}

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (
  set,
  get
) => ({
  user: null,
  userLoading: false,
  userError: null,
  clearUserError: () => set({ userError: null }),
  login: async (data) => {
    set({ socketLoading: true, userError: null });
    const [user, error] = await usePost<User>(ApiUrls.login, { json: data });
    set({
      socketLoading: false,
      ...(user ? { user } : { userError: error }),
    });
  },
  register: async (data) => {
    set({ socketLoading: true, userError: null });
    const [user, error] = await usePost<User>(ApiUrls.register, { json: data });
    set({
      socketLoading: false,
      ...(user ? { user } : { userError: error }),
    });
  },
});
