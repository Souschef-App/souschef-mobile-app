import { StateCreator } from "zustand";
import { ApiUrls } from "../../api/constants/ApiConstants";
import { User } from "../../api/responses";
import { usePost } from "../../api/usePost";
import { StoreState } from "../store";

export interface UserSlice {
  user: User | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
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
  loading: false,
  error: null,
  clearError: () => set({ error: null }),
  login: async (data) => {
    set({ loading: true, error: null });
    const [user, error] = await usePost<User>(ApiUrls.login, { json: data });
    set({
      loading: false,
      ...(user ? { user } : { error }),
    });
  },
  register: async (data) => {
    set({ loading: true, error: null });
    const [user, error] = await usePost<User>(ApiUrls.register, { json: data });
    set({
      loading: false,
      ...(user ? { user } : { error }),
    });
  },
});
