import React, { FC } from "react";
import {
  ColorValue,
  DimensionValue,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Icons from "../../assets/icons";

export type IconNames = keyof typeof Icons;

export type IconProps = {
  name: IconNames;
  color?: ColorValue;
  size?: DimensionValue | undefined;
  style?: ViewStyle;
};

const iconDefaultProps: IconProps = {
  name: "home",
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
    <View
      style={[
        props.style,
        {
          width: props.size,
          aspectRatio: 1,
        },
      ]}
    >
      <SvgComponent
        color={props.color}
        width={"100%"}
        height={"100%"}
        style={props.style}
      />
    </View>
  );
};

export default Icon;
