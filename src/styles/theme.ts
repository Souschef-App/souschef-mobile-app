import { Color, Theme } from "./types";

const palette: { [key: string]: Color } = {
  white: "#ffffff",
  lightgray: "#e4e4e4",
  blue: "#2E9DFB",
  green: "#7ac879",
  darkred: "#e44f49",
  red: "#fb6a69",
  bluegray: "#2F394A",
  iceblue: "#B3BAC0",
  gold: "#ffcd3c",
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  b: 24,
  l: 32,
  xl: 48,
  xxl: 56,
  xxxl: 64,
}

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
    xs: Spacing.xs,
    s: Spacing.s,
    m: Spacing.m,
    b: Spacing.b,
    l: Spacing.l,
    xl: Spacing.xl,
    xxl: Spacing.xxl,
    xxxl: Spacing.xxxl,
  },
};

export const darkTheme: Theme = {
  ...theme,
};
