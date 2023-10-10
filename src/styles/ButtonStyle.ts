import { ViewStyle } from "react-native";

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

export const primary: ViewStyle = {
  ...buttonCore.center,
  ...buttonCore.rounded,
  ...padding(12, 32),
  elevation: 4,
};

export const account: ViewStyle = {
  ...buttonCore.center,
  ...padding(0, 16),
  ...buttonCore.curved,
  height: 56,
};
