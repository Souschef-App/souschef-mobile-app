import { TextStyle } from "react-native";
import { theme } from "./theme";

const textCore: { [key: string]: TextStyle } = {
  defaultFont: {
    // fontFamily: "Inter",
    color: theme.colors.text,
  },
};

export const h1: TextStyle = {
  ...textCore.defaultFont,
  fontSize: 32,
  fontWeight: "bold",
};

export const h2: TextStyle = {
  ...textCore.defaultFont,
  fontSize: 24,
  fontWeight: "bold",
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
