import React from "react";
import { theme } from "../styles/theme";

export type AppConfig = {
    useFakeData: boolean;
};

export const defaultConfig: AppConfig = {
    useFakeData: false,
};

export const AppContext = React.createContext(defaultConfig);

export const ThemeContext = React.createContext(theme);
