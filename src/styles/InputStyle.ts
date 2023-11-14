import { ViewStyle } from "react-native";
import { theme } from "./theme";

const inputCore: { [key: string]: ViewStyle } = {};

export const underline: ViewStyle = {
  // flexGrow: 1,
  height: theme.spacing.xl,
  borderBottomColor: theme.colors.text,
  borderBottomWidth: 2,
};

export const multiline: ViewStyle = {
  backgroundColor: theme.colors.background2,
  padding: 15,
  flex: 1,
};

export const outline: ViewStyle = {
  height: theme.spacing.xl,
  borderColor: theme.colors.text,
  borderRadius: 8,
  borderWidth: 2,
};
