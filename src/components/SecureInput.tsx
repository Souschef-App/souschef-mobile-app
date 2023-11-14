import React, { LegacyRef } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Button from "./primitives/Button";
import Icon from "./primitives/Icon";

export type SecureInputProps = Omit<TextInputProps, "secureTextEntry"> & {
  iconColor?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
};

const iconSize = 18;

const SecureInput = (props: SecureInputProps) => {
  const inputRef: LegacyRef<TextInput> = React.useRef(null);
  const [isShown, setIsShown] = React.useState(false);

  const handleButtonClick = () => {
    if (inputRef.current && !inputRef.current.isFocused()) {
      inputRef.current.focus();
    }

    setIsShown(!isShown);
  };

  return (
    <View style={[props.containerStyle, styles.row]}>
      <TextInput
        {...props}
        ref={inputRef}
        secureTextEntry={!isShown}
        style={[props.style, styles.input]}
      />
      <Button onPress={handleButtonClick}>
        <Icon
          name={isShown ? "hide" : "show"}
          color={props.iconColor ?? "#000"}
          size={iconSize}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  input: {
    flex: 1,
  },
});

export default SecureInput;
