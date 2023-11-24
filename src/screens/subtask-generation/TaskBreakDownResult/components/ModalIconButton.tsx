import React from "react";
import {
  ColorValue,
  GestureResponderEvent,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Icons from "../../../../assets/icons";
import { ButtonProps } from "../../../../components/primitives/Button";
import Icon from "../../../../components/primitives/Icon";

export type IconButtonProps = ButtonProps & {
  icon: keyof typeof Icons;
  title?: string;
  color?: ColorValue;
  iconSize?: number;
  iconStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const iconButtonDefaultProps: IconButtonProps = {
  onPress: () => {},
  icon: "home",
  color: "black",
  iconSize: 32,
};

const ModalIconButton = (propsIn: IconButtonProps) => {
  const props = {
    ...iconButtonDefaultProps,
    ...propsIn,
  };

  return (
    <Pressable
      {...props}
      style={[
        {
          position: "relative",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        },
        props.style,
      ]}
    >
      <Icon
        name={props.icon}
        color={props.color}
        size={props.iconSize}
        style={props.iconStyle}
      />
    </Pressable>
  );
};

export default ModalIconButton;
