import React, { PropsWithChildren } from "react";
import Button from "./primitives/Button";
import Icon from "./primitives/Icon";
import Input, { InputProps } from "./primitives/Input";
import { TextInput } from "react-native";

export type SecureInputProps = Omit<InputProps, "password">;

const SecureInput = (props: PropsWithChildren<SecureInputProps>) => {
  const inputRef: React.ForwardedRef<TextInput> = React.useRef(null);
  const [isShown, setIsShown] = React.useState(false);
  const passwordIconName = isShown ? "hide" : "show";

  const handleButtonClick = () => {
    setIsShown(!isShown);
    if (!inputRef.current?.isFocused()) {
      inputRef.current?.focus();
    }
  };

  return (
    <Input ref={inputRef} {...props} password={!isShown}>
      <Button onPress={handleButtonClick}>
        <Icon name={passwordIconName} color={props.iconColor} size={18} />
      </Button>
    </Input>
  );
};

export default SecureInput;
