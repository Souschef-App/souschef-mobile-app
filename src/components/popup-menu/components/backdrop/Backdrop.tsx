import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

// Components
import { BlurView } from 'expo-blur';

// Utils
import {
  CONTEXT_MENU_STATE,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
  WINDOW_HEIGHT,
} from '../../Constants';
// import {
//   BACKDROP_LIGHT_BACKGROUND_COLOR,
//   BACKDROP_DARK_BACKGROUND_COLOR,
// } from './constants';
import { useInternal } from '../../hooks';

const AnimatedBlurView = IS_IOS
  ? Animated.createAnimatedComponent(BlurView)
  : Animated.View;

type Context = {
  startPosition: {
    x: number;
    y: number;
  };
};

const BackdropComponent = () => {
  const { state } = useInternal();

  const tapGestureEvent = useAnimatedGestureHandler<
    TapGestureHandlerGestureEvent,
    Context
  >(
    {
      onStart: (event, context) => {
        context.startPosition = { x: event.x, y: event.y };
      },
      onCancel: () => {
        state.value = CONTEXT_MENU_STATE.END;
      },
      onEnd: (event, context) => {
        const distance = Math.hypot(
          event.x - context.startPosition.x,
          event.y - context.startPosition.y
        );
        const shouldClose = distance < 10;
        const isStateActive = state.value === CONTEXT_MENU_STATE.ACTIVE;

        if (shouldClose && isStateActive) {
          state.value = CONTEXT_MENU_STATE.END;
        }
      },
    },
    [state]
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    const topValueAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? 0
        : withDelay(
            HOLD_ITEM_TRANSFORM_DURATION,
            withTiming(WINDOW_HEIGHT, {
              duration: 0,
            })
          );

    const opacityValueAnimation = () =>
      withTiming(state.value === CONTEXT_MENU_STATE.ACTIVE ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      top: topValueAnimation(),
      opacity: opacityValueAnimation(),
    };
  });

  const animatedContainerProps = useAnimatedProps(() => {
    return {
      intensity: withTiming(
        state.value === CONTEXT_MENU_STATE.ACTIVE ? 100 : 0,
        {
          duration: HOLD_ITEM_TRANSFORM_DURATION,
        }
      ),
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = 
      "light" === 'light'
        ? "#00000092"
        : "purple";

    return { backgroundColor };
  }, []);

  return (
    <TapGestureHandler onHandlerStateChange={tapGestureEvent}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <AnimatedBlurView
          // @ts-ignore
          tint="default"
          animatedProps={animatedContainerProps}
          style={[styles.container]}
        >
          <Animated.View
            style={[
              { ...StyleSheet.absoluteFillObject },
              animatedInnerContainerStyle,
            ]}
          />
        </AnimatedBlurView>
      </Animated.View>
    </TapGestureHandler>
  );
};

const Backdrop = memo(BackdropComponent);


export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});

export default Backdrop;