import React from "react";
import {
  ColorValue,
  GestureResponderEvent,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Icons from "../assets/icons";
import Button from "./primitives/Button";
import Icon from "./primitives/Icon";

export type IconButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  icon: keyof typeof Icons;
  color?: ColorValue;
  iconSize?: number;
  title?: string;
  style?: ViewStyle;
  iconStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const iconButtonDefaultProps: IconButtonProps = {
  onPress: () => {},
  icon: "home",
  color: "black",
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
        color={props.color}
        size={props.iconSize}
        style={props.iconStyle}
      />
      {props.title && (
        <Text style={{ color: props.color, ...props.textStyle }}>
          {props.title}
        </Text>
      )}
    </Button>
  );
};

export default IconButton;
