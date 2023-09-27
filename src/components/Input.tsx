import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {SpringPressable} from './pressable';
import {IFrameProps} from './primitives/Frame';
import Row from './primitives/Row';

interface IInputProps extends IFrameProps {
  placeholder: string;
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  secure?: boolean;
  textStyle?: object;
}

type InputProps = IInputProps;

const inputDefaultProps: IInputProps = {
  placeholder: 'Placeholder',
  bgColor: '#fff',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 16,
  secure: false,
};

const Input: React.FC<InputProps> = (propsIn: IInputProps) => {
  const props = {...inputDefaultProps, ...propsIn};
  const [hidden, setHidden] = useState(props.secure);
  const toggleHidden = () => {
    setHidden(!hidden);
  };
  return (
    <Row {...props} justifyContent="space-between">
      <TextInput
        autoComplete={'off'}
        importantForAutofill={'no'}
        placeholderTextColor="#cbcdd1"
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={hidden}
        style={[styles.inputText, props.textStyle]}
      />
      {props.secure && (
        <SpringPressable onPress={toggleHidden}>
          {hidden ? (
            <MaterialCommunityIcon name="eye" style={styles.icon} />
          ) : (
            <MaterialCommunityIcon name="eye-off" style={styles.icon} />
          )}
        </SpringPressable>
      )}
    </Row>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f394a',
    flexGrow: 1,
  },
  icon: {
    fontSize: 28,
    color: '#cbcdd1',
  },
});

export default Input;
