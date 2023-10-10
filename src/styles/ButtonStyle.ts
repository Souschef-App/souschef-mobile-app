import {StyleSheet} from 'react-native';

const buttonCore = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rounded: {
    borderRadius: 20,
  },
});

const padding = (v: number, h: number) => {
  return {
    paddingVertical: v,
    paddingHorizontal: h,
  };
};

export const primary = {
  ...buttonCore.center,
  ...padding(12, 32),
  ...buttonCore.rounded,
  elevation: 4,
};
