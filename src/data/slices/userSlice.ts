import { StateCreator } from "zustand";
import { ApiUrls } from "../../api/constants";
import jsonRequest from "../../api/requests";
import { StoreState } from "../store";
import { guestSessionUser } from "../__mocks__";

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
  resetUserError: () => void;
  login: ({}: { email: string; password: string }) => Promise<void>;
  loginAsGuest: (guestname: string) => void;
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
  resetUserError: () => set({ userError: null }),
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
  loginAsGuest: (guestname: string) => {
    const user: User = {
      ...guestSessionUser,
      email: "guest@mail.com",
      name: guestname,
    };
    set({ user });
  },
  fakeLogin: () => {
    const user: User = {
      ...guestSessionUser,
      email: "guest@mail.com",
    };
    set({ user });
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
