import React from "react";
import { DimensionValue, View } from "react-native";
import Icon from "./primitives/Icon";

export type LogoProps = {
  size: DimensionValue;
};

const Logo = (props: LogoProps) => {
  return (
    <View style={{ position: "relative" }}>
      <Icon
        name="logo-shadow"
        size={props.size}
        color={"#0004"}
        style={{ position: "absolute", top: 2 }}
      />
      <Icon name="logo" size={props.size} />
    </View>
  );
};

export default Logo;
