import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Color} from '../styles/theme';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export type IconButtonProps = {
  iconName: string;
  text?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  color?: Color;
  bgColor?: Color;
  size?: number;
  style?: object;
  iconStyling?: object;
};

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  text,
  onPress,
  color = '#FFFFFF',
  bgColor = '#FB6A69',
  size = 20,
  style = {borderRadius: 128, elevation: 4},
  iconStyling,
}) => {
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{transform: [{scale}]}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
          width: size ? (text ? 'auto' : size * 2) : 16,
          height: size ? size * 2 : 16,
          backgroundColor: bgColor,
          ...style,
          ...styles.button,
        }}>
        <View style={styles.row}>
          <MaterialCommunityIcon
            name={iconName}
            color={color}
            style={{
              fontSize: size,
              ...iconStyling,
            }}
          />
          {text ? (
            <Text
              style={{
                color: color,
                fontSize: size * 0.75,
                ...styles.buttonText,
              }}>
              {text}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {justifyContent: 'center', alignItems: 'center', padding: 8},
  buttonText: {textAlign: 'center', paddingLeft: 8},
});

export default IconButton;
