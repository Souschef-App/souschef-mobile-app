import { TextStyle } from "react-native";
import { theme } from "./theme";

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
  fontSize: 20,
};

export const h4: TextStyle = {
  ...textCore.defaultFont,
  fontSize: 18,
};

export const body: TextStyle = {
  ...textCore.defaultFont,
  fontSize: 16,
};
