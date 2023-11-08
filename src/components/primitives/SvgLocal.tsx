import React, { PropsWithChildren } from "react";
import { ColorValue, StyleProp, Text, View, ViewStyle } from "react-native";
import Backgrounds from "../../assets/backgrounds";

export type SvgLocalProps = {
  name: keyof typeof Backgrounds;
  color?: ColorValue;
  aspectRatio?: number;
  style?: StyleProp<ViewStyle>;
};

const SvgLocal = (props: PropsWithChildren<SvgLocalProps>) => {
  const SvgComponent = Backgrounds[props.name];

  if (!SvgComponent) {
    return <Text>Icon not found</Text>;
  }

  return (
    <View
      style={[
        props.style,
        {
          alignSelf: "stretch",
          aspectRatio: props.aspectRatio,
        },
      ]}
    >
      <SvgComponent color={props.color} width={"100%"} height={"100%"} />
    </View>
  );
};

export default SvgLocal;
