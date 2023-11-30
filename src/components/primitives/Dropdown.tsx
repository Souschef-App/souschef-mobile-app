import React, { PropsWithChildren } from "react";
import {
  ColorValue,
  GestureResponderEvent,
  Text,
  TextStyle,
  ViewStyle,
  View,
} from "react-native";
import { HStack, VStack } from "./Stack";
import Button from "./Button";
import Icon, { IconNames } from "./Icon";

export type DropdownProps = {
  isOpen: boolean;
  title: string;
  onPress: () => void;
  icon?: IconNames;
  iconColor?: ColorValue;
  textStyle?: TextStyle;
  style?: ViewStyle;
};

const defaultDropdownProps: DropdownProps = {
  isOpen: false,
  title: "Placeholder",
  onPress: () => {},
  iconColor: "#000",
};

const Dropdown = (propsIn: PropsWithChildren<DropdownProps>) => {
  const props = {
    ...defaultDropdownProps,
    ...propsIn,
  };

  return (
    <VStack flexMain={false} flexCross={true}>
      <Button
        animation="opacity"
        onPress={props.onPress}
        style={{ flexDirection: "row" }}
      >
        <HStack style={props.style}>
          <HStack justifyContent="flex-start" colGap={16}>
            {props.icon && <Icon name={props.icon} color={props.iconColor} />}
            <Text style={props.textStyle}>{props.title}</Text>
          </HStack>
          <Icon
            name={`arrow-${props.isOpen ? "up" : "down"}`}
            size={18}
            color={props.textStyle?.color || "#000"}
          />
        </HStack>
      </Button>
      {props.isOpen && props.children}
    </VStack>
  );
};

export default Dropdown;
