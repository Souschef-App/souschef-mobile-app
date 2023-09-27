import React, {PropsWithChildren} from 'react';
import {User} from '../api/responses';
import {theme} from '../styles/theme';

export type Auth = {
  user: User | undefined;
  login: ({}: {json: {email: string; password: string}}) => void;
  loginSuccess: boolean;
  loginLoading: boolean;
  loginError: unknown;
  register: ({}: {
    json: {
      userName: string;
      email: string;
      password: string;
      passwordConfirm: string;
    };
  }) => void;
  registerSuccess: boolean;
  registerLoading: boolean;
  registerError: unknown;
};

export const defaultAuth: Auth = {
  user: undefined,
  login: () => {},
  loginSuccess: false,
  loginLoading: false,
  loginError: null,
  register: () => {},
  registerSuccess: false,
  registerLoading: false,
  registerError: null,
};

export const AuthContext = React.createContext(defaultAuth);

export const ThemeContext = React.createContext(theme);
