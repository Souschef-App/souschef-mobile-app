import React from "react";
import {
  ColorValue,
  GestureResponderEvent,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Button from "./primitives/Button";
import Icon from "./primitives/Icon";

export type IconButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  iconColor?: ColorValue;
  iconSize?: number;
  title?: string;
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const iconButtonDefaultProps: IconButtonProps = {
  onPress: () => {},
  icon: "home",
  iconColor: "black",
  iconSize: 32,
};

const IconButton = (propsIn: IconButtonProps) => {
  const props = {
    ...iconButtonDefaultProps,
    ...propsIn,
  };

  return (
    <Button
      onPress={props.onPress}
      style={{
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 8,
        ...props.style,
      }}
    >
      <Icon
        name={props.icon}
        color={props.iconColor}
        size={props.iconSize}
        style={props.iconStyle}
      />
      {props.title && <Text style={props.textStyle}>{props.title}</Text>}
    </Button>
  );
};

export default IconButton;
