import React, { PropsWithChildren, forwardRef } from "react";
import {
  ColorValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputChangeEventData,
  TextStyle,
  ViewStyle,
} from "react-native";
import { HStack } from "./Stack";
import Icon from "./Icon";
import Button from "./Button";

export type InputProps = {
  value: string;
  defaultValue?: string;
  onChange: (text: string) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  icon?: string;
  iconColor?: ColorValue;
  password?: boolean;
  placeholder?: string;
  placeholderColor?: ColorValue;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean,
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Input = forwardRef<TextInput, PropsWithChildren<InputProps>>(
  (props, ref) => {
    return (
      <HStack
        flexMain={false}
        flexCross={false}
        gap={16}
        style={{ ...props.style }}
      >
        {props?.icon && (
          <Icon name={props.icon} color={props.iconColor} size={18} />
        )}
        <TextInput
          ref={ref}
          value={props.value}
          defaultValue={props.defaultValue}
          onChangeText={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          secureTextEntry={props.password}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderColor}
          keyboardType={props.keyboardType}
          autoCapitalize={props.autoCapitalize}
          multiline={props.multiline}
          style={{ flexGrow: 1, flexShrink: 1, ...props.textStyle }}
        />
        {props.children}
      </HStack>
    );
  }
);

export default Input;
