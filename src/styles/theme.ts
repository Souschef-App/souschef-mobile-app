import { Color, Theme } from "./types";

const palette: { [key: string]: Color } = {
  white: "#ffffff",
  lightgray: "#e4e4e4",
  blue: "#2E9DFB",
  green: "#3ddc84",
  darkred: "#e44f49",
  red: "#fb6a69",
  bluegray: "#2F394A",
  iceblue: "#B3BAC0",
  gold: "#ffcd3c",
};

export const theme: Theme = {
  colors: {
    primary: palette.green,
    secondary: palette.darkred,
    background: palette.white,
    background2: palette.lightgray,
    success: palette.green,
    danger: palette.red,
    highlight: palette.blue,
    highlight2: palette.gold,
    text: palette.bluegray,
    textDisabled: palette.iceblue,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    b: 24,
    l: 48,
    xl: 56,
    xxl: 64,
  },
};

export const darkTheme: Theme = {
  ...theme,
};
