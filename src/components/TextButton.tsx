import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import Button, { ButtonProps } from "./primitives/Button";

export type TextButtonProps = ButtonProps & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
};

const TextButton = (props: TextButtonProps) => {
  return (
    <Button {...props}>
      <Text style={props.textStyle}>{props.title}</Text>
    </Button>
  );
};

export default TextButton;
