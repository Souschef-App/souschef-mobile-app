import { StateCreator } from "zustand";
import { ApiUrls } from "../../api/constants";
import { User } from "../types";
import jsonRequest from "../../api/requests";
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
    set({ userLoading: true, userError: null });
    const [user, error] = await jsonRequest.post<User>(ApiUrls.login, {
      json: data,
    });
    set({
      userLoading: false,
      ...(user ? { user } : { userError: error }),
    });
  },
  register: async (data) => {
    set({ userLoading: true, userError: null });
    const [user, error] = await jsonRequest.post<User>(ApiUrls.register, {
      json: data,
    });
    set({
      userLoading: false,
      ...(user ? { user } : { userError: error }),
    });
  },
});
