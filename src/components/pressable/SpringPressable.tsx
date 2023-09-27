import React, {type PropsWithChildren} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {makeStackComponent} from '../primitives/Stack';
import {IPressable} from './type';

type SpringPressableProps = IPressable;

const AnimatedViewStack = makeStackComponent(Animated.View);
const TouchableOpacityStack = makeStackComponent(TouchableOpacity);

const SpringPressable: React.FC<PropsWithChildren<SpringPressableProps>> = (
  props: IPressable,
) => {
  // Animation
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.85];
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
    <AnimatedViewStack {...props} style={{transform: [{scale}]}}>
      <TouchableOpacityStack
        {...props}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        {props.children}
      </TouchableOpacityStack>
    </AnimatedViewStack>
  );
};

export default SpringPressable;
