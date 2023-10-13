import React, { PropsWithChildren } from "react";
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  ColorValue,
} from "react-native";

export type DividerProps = {
  vertical?: boolean;
  rounded?: boolean;
  thickness?: number;
  color?: ColorValue;
};

const defaultDividerProps: DividerProps = {
  vertical: true,
  rounded: true,
  thickness: 6,
  color: "#000",
};

const Divider = (propsIn: DividerProps) => {
  const props = { ...defaultDividerProps, ...propsIn };
  const styles = React.useMemo(() => makeStyles(props.thickness!), [props]);

  return (
    <View
      style={{
        backgroundColor: props.color,
        borderRadius: props.rounded ? 1000 : 0,
        ...(props.vertical ? styles.vertical : styles.horizontal),
      }}
    />
  );
};

const makeStyles = (thickness: number) =>
  StyleSheet.create({
    vertical: {
      width: thickness,
      height: "100%",
    },
    horizontal: {
      width: "100%",
      height: thickness,
    },
  });

export default Divider;
