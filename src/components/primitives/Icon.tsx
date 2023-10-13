import React, { FC } from "react";
import { ColorValue, Text, ViewStyle } from "react-native";
import Icons from "../../assets/icons";

export type IconProps = {
  name: string;
  color?: ColorValue;
  size?: number;
  style?: ViewStyle;
};

const iconDefaultProps: IconProps = {
  name: "",
  color: "black",
  size: 24,
};

const Icon: FC<IconProps> = (propsIn: IconProps) => {
  const props = {
    ...iconDefaultProps,
    ...propsIn,
  };

  const SvgComponent = Icons[props.name];

  if (!SvgComponent) {
    return <Text>Icon not found</Text>;
  }

  return (
    <SvgComponent
      color={props.color}
      width={props.size}
      height={props.size}
      style={props.style}
    />
  );
};

export default Icon;
