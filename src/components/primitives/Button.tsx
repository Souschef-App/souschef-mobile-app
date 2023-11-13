import React, { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  GestureTouchEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type ButtonProps = {
  onPress: () => void;
  animation?: "shrink";
  style?: StyleProp<ViewStyle>;
};

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    })
    .onTouchesUp(props.onPress)
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => {
    switch (props.animation) {
      default: // Shrink
        return {
          transform: [
            { scale: withTiming(pressed.value ? 0.9 : 1, { duration: 100 }) },
          ],
          // Add more style properties for the 'shrink' animation if needed
        };
    }
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[props.style, animatedStyles]}>
        {props.children}
      </Animated.View>
    </GestureDetector>
  );
};

export default Button;
