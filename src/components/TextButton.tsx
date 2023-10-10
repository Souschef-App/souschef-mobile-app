import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Button } from "../components";

export type TextButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const TextButton = (props: TextButtonProps) => {
  return (
    <Button onPress={props.onPress} style={props.style}>
      <Text style={props.textStyle}>{props.title}</Text>
    </Button>
  );
};

export default TextButton;
