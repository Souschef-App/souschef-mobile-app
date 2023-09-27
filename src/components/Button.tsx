import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../styles/theme';

export type ButtonProps = {
  title: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  bgColor?: Color;
  radius?: number;
  elevation?: number;
  textColor?: Color;
  style?: object;
  textStyling?: object;
  children?: undefined;
};

const Button: React.FC<ButtonProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{padding: 10}}>
      <View
        style={{
          backgroundColor: props.bgColor,
          borderRadius: props.radius,
          elevation: props.elevation,
          ...styles.button,
          ...props.style,
        }}>
        <Text
          style={{
            color: props.textColor,
            ...styles.buttonText,
            ...props.textStyling,
          }}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  bgColor: '#FB6A69',
  radius: 12,
  elevation: 0,
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
