import { StateCreator } from "zustand";
import { ApiUrls } from "../../api/constants";
import { User } from "../types";
import jsonRequest from "../../api/requests";
import { StoreState } from "../store";
import { fakeUser } from "../__mocks__";

type UserState = {
  user: User | null;
  userLoading: boolean;
  userError: string | null;
};

const initialState: UserState = {
  user: null,
  userLoading: false,
  userError: null,
};

type UserActions = {
  resetUserSlice: () => void;
  login: ({}: { email: string; password: string }) => Promise<void>;
  fakeLogin: () => void;
  register: ({}: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => Promise<void>;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<StoreState, [], [], UserSlice> = (
  set,
  get
) => ({
  ...initialState,
  resetUserSlice: () => set(initialState),
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
  fakeLogin: () => {
    set({ user: fakeUser });
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
