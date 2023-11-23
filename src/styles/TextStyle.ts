import { TextStyle } from "react-native";
import { theme } from "./theme";

export const lineHeight = 20;

export const fontSizes = {
  xs:16,
  s: 18,
  m:20
}

const textCore: { [key: string]: TextStyle } = {
  defaultFont: {
    fontFamily: "RobotoSlab",
    color: theme.colors.text,
  },
  bold: {
    fontFamily: "RobotoSlab-Bold",
  },
};

export const bold: TextStyle = {
  ...textCore.bold,
};

export const h1: TextStyle = {
  ...textCore.defaultFont,
  ...textCore.bold,
  fontSize: 36,
};

export const h2: TextStyle = {
  ...textCore.defaultFont,
  ...textCore.bold,
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

export const menuTitleText : TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.m,
  lineHeight: lineHeight
}

export const menuText : TextStyle = {
  ...textCore.defaultFont,
  fontSize: fontSizes.xs,
  lineHeight: lineHeight
}