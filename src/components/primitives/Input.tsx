import React, { PropsWithChildren, forwardRef } from "react";
import {
  ColorValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from "react-native";
import Icon from "./Icon";
import { HStack } from "./Stack";

export type InputProps = {
  value: string;
  defaultValue?: string;
  onChange: (text: string) => void;
  onSubmit?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  icon?: string;
  iconColor?: ColorValue;
  password?: boolean;
  placeholder?: string;
  placeholderColor?: ColorValue;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
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
          onSubmitEditing={props.onSubmit}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          secureTextEntry={props.password}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderColor}
          keyboardType={props.keyboardType}
          maxLength={props.maxLength}
          autoCapitalize={props.autoCapitalize}
          multiline={props.multiline}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            width: "100%",
            ...props.textStyle,
          }}
        />
        {props.children}
      </HStack>
    );
  }
);

export default Input;
