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
};

const padding = (v: number, h: number) => {
  return {
    paddingVertical: v,
    paddingHorizontal: h,
  };
};

const shadow = (height: number) => ({
  elevation: height,
  // iOS shadow
  shadowOffset: {
    width: 0,
    height: -height,
  },
});

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
  height: theme.spacing.xl,
};

export const floating: ViewStyle = {
  ...buttonCore.rounded,
  ...shadow(8),
  position: "absolute",
  borderRadius: 64,
  width: theme.spacing.xxl,
  height: theme.spacing.xxl,
};

export const round: ViewStyle = {
  ...buttonCore.center,
  ...padding(0, 16),
  ...buttonCore.rounded,
  height: 56,
  width: 56,
};

export const editable: ViewStyle = {
  ...buttonCore.center,
  ...padding(0, 16),
  ...buttonCore.curved,
  margin: 0,
  // height: 56,
};
