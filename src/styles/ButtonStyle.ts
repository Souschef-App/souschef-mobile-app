import { ViewStyle } from "react-native";
import { theme } from "./theme";

const buttonCore: { [key: string]: ViewStyle } = {
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  curved: {
    borderRadius: 8,
  },
  rounded: {
    borderRadius: 1000,
  },
  shadow: {
    // Android shadow
    elevation: 2,
    // iOS shadow
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
};

const padding = (v: number, h: number) => {
  return {
    paddingVertical: v,
    paddingHorizontal: h,
  };
};

export const primary: ViewStyle = {
  ...buttonCore.center,
  ...buttonCore.rounded,
  ...padding(8, 16),
  height: theme.spacing.xxl,
};

export const account: ViewStyle = {
  ...buttonCore.center,
  ...padding(0, 16),
  ...buttonCore.curved,
  height: 56,
};
