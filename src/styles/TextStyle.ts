import { TextStyle, StyleSheet } from "react-native";
import { theme } from "./theme";
import { Theme } from "./types";

export const lineHeight = 20;

export const fontSizes = {
  xs: 16,
  s: 18,
  m: 20,
};

const textCore: { [key: string]: TextStyle } = {
  defaultFont: {
    fontFamily: "RobotoSlab",
    color: theme.colors.text,
  },
};

type FontWeight = "regular" | "bold";

export const weight: { [key in FontWeight]: TextStyle } = {
  regular: {
    fontFamily: "RobotoSlab",
  },
  bold: {
    fontFamily: "RobotoSlab-Bold",
  },
};

export const h1: TextStyle = {
  ...textCore.defaultFont,
  ...weight.bold,
  fontSize: 36,
};

export const h2: TextStyle = {
  ...textCore.defaultFont,
  ...weight.bold,
  fontSize: 24,
};

export const h3: TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.m,
};

export const h4: TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.s,
};

export const body: TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.xs,
};

export const menuTitleText: TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.m,
  lineHeight: lineHeight,
};

export const menuText: TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.xs,
  lineHeight: lineHeight,
};

// export const modalButtonText: TextStyle = {
//   ...textCore.defaultFont,
//   fontSize: fontSizes.s,
// };
export const modalButtonText = (theme: Theme) =>
  StyleSheet.create({
    text: {
      ...textCore.defaultFont,
      fontSize: fontSizes.s,
      color: theme.colors.background,
    },
  });
