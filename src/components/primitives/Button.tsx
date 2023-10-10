import React, { PropsWithChildren } from "react";
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  Pressable,
} from "react-native";

export type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

const Button = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <Pressable onPress={props.onPress} style={props?.style}>
      {props.children}
    </Pressable>
  );
};

export default Button;
