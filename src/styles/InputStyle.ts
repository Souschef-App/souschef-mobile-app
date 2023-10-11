import { ViewStyle } from "react-native";
import { theme } from "./theme";

const inputCore: { [key: string]: ViewStyle } = {};

export const underline: ViewStyle = {
  height: theme.spacing.xl,
  borderBottomColor: theme.colors.text,
  borderBottomWidth: 2,
};
