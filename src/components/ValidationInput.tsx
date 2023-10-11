import React, { PropsWithChildren } from "react";
import { theme } from "../styles/theme";
import Icon from "./primitives/Icon";
import Input, { InputProps } from "./primitives/Input";

export type ValidationInputProps = InputProps & {
  isValid: boolean;
  isStatusVisible: boolean;
};

const ValidationInput = (props: PropsWithChildren<ValidationInputProps>) => {
  const iconName = props.isValid ? "check" : "x";
  const iconColor = props.isValid ? theme.colors.success : theme.colors.danger;
  return (
    <Input {...props} autoCapitalize="none">
      {props.isStatusVisible && (
        <Icon name={iconName} color={iconColor} size={18} />
      )}
    </Input>
  );
};

export default ValidationInput;
