import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle, GestureResponderEvent, Pressable } from "react-native";



export type ButtonProps = {
    style: StyleProp<ViewStyle>;
    onPress: (event: GestureResponderEvent) => void;
  };
  
  export const Button = (props: PropsWithChildren<ButtonProps>) => {
    return (
      <Pressable onPress={props.onPress} style={props.style}>
        {props.children}
      </Pressable>
    );
  };
  