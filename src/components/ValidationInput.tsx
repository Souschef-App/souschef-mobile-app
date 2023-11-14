import React from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { theme } from "../styles/theme";
import Icon from "./primitives/Icon";

export type ValidationInputProps = TextInputProps & {
  validationRegex: RegExp;
  containerStyle?: StyleProp<ViewStyle>;
};

const iconSize = 18;

const ValidationInput = (props: ValidationInputProps) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const handleTextChange = (value: string) => {
    props.onChangeText?.(value);

    const valid = props.validationRegex.test(value);
    setIsValid(valid);
    setIsVisible(valid);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onBlur?.(e);
    if (props.value) {
      setIsVisible(props.value!.length > 0);
    }
  };

  return (
    <View style={[props.containerStyle, { justifyContent: "center" }]}>
      <View style={{ justifyContent: "center" }}>
        <TextInput
          {...props}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
        />
        {isVisible && (
          <Icon
            name={isValid ? "check" : "x"}
            color={isValid ? theme.colors.success : theme.colors.danger}
            size={iconSize}
            style={{
              position: "absolute",
              right: 0,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ValidationInput;
