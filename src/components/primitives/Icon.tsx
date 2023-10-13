import React, { FC } from "react";
import { ColorValue, Text } from "react-native";
import Icons from "../../assets/icons";

type IconProps = {
  name: string;
  color?: ColorValue;
  size?: number;
};

const Icon: FC<IconProps> = ({ name, color = "black", size = 24 }) => {
  const SvgComponent = Icons[name];

  if (!SvgComponent) {
    return <Text>Icon not found</Text>;
  }

  return <SvgComponent color={color} width={size} height={size} />;
};

export default Icon;
