import { TextStyle } from "react-native";

const textCore: { [key: string]: TextStyle } = {
  defaultFont: {
    fontFamily: "Inter",
  },
};

export const header: TextStyle = {
  ...textCore.defaultFont,
  fontSize: 36,
  fontWeight: "bold",
};

export const body: TextStyle = {
  ...textCore.defaultFont,
  fontSize: 16,
};
