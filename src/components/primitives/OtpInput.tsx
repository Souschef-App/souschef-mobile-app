import React from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  ViewStyle,
} from "react-native";
import { HStack } from "./Stack";

export type OtpInputProps = {
  pinCount: number;
  onCodeFilled?: (code: string) => void;
  onCodeChanged?: (code: string) => void;
  codeInputFocusStyle?: ViewStyle;
  codeInputBlurStyle?: ViewStyle;
  spacing?: number;
};

const defaultOtpInputProps: OtpInputProps = {
  pinCount: 3,
  onCodeFilled: (code: string) => {},
  onCodeChanged: (code: string) => {},
  codeInputFocusStyle: {},
  codeInputBlurStyle: {},
  spacing: 16,
};

// TODO: Fix for iOS keyboard (simulator only?)
const OtpInput = (propsIn: OtpInputProps) => {
  const props = { ...defaultOtpInputProps, ...propsIn };

  const [otp, setOtp] = React.useState(Array(props.pinCount).fill(""));
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  const inputRefs: TextInput[] = [];
  const internalFocusRef = React.useRef(false);

  React.useEffect(() => {
    const isFilled = otp.every((digit) => digit.length === 1);
    const isLastIndex = focusedIndex === otp.length - 1;
    if (isFilled && isLastIndex) {
      otpSubmit();
    }
  }, [otp]);

  const shiftFocus = (index: number, amount: number) => {
    internalFocusRef.current = true;
    inputRefs[index + amount].focus();
    setFocusedIndex(index + amount);
  };

  const otpSubmit = () => {
    props.onCodeFilled?.(otp.join(""));
    setOtp(Array(props.pinCount).fill(""));
    setFocusedIndex(null);
    Keyboard.dismiss();
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    props.onCodeChanged?.(otp.join(""));

    if (value && index < newOtp.length - 1) {
      shiftFocus(index, 1);
    }
  };

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (internalFocusRef.current) {
      internalFocusRef.current = false;
      return;
    }

    for (let i = 0; i < props.pinCount; i++) {
      if (!otp[i]) {
        setFocusedIndex(i);
        inputRefs[i].focus();
        break;
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      e.preventDefault();
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);

        shiftFocus(index, -1);
      }
    }
  };

  return (
    <HStack flexMain={false} flexCross={false} gap={props.spacing}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(input) => {
            inputRefs[index] = input!;
          }}
          value={digit}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(value) => handleOtpChange(value, index)}
          onFocus={(e) => handleOnFocus(e)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          selectTextOnFocus={true}
          selectionColor={"#fff0"} // transparent
          caretHidden={true}
          contextMenuHidden={true}
          style={[
            props.codeInputBlurStyle,
            focusedIndex === index && props.codeInputFocusStyle,
          ]}
        />
      ))}
    </HStack>
  );
};

export default OtpInput;
