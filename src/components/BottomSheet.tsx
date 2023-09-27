import React, {useCallback, useContext, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {ThemeContext} from '../contexts/AppContext';
import {Theme} from '../styles/type';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT;
const MIN_TRANSLATE_Y = (-SCREEN_HEIGHT * 2) / 3;
const MIN_MAX_DIFF = MIN_TRANSLATE_Y - MAX_TRANSLATE_Y;
const HALF_TRANSLATE_Y = (MAX_TRANSLATE_Y + MIN_TRANSLATE_Y) / 2;

type BottomSheetProps = {
  onStateChange: (state: BottomSheetState) => void;
  zIndex?: number;
  children?: React.ReactNode;
};
export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  minimize: () => void;
  maximize: () => void;
};

export const enum BottomSheetState {
  Max,
  Min,
  Hidden,
}

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({children, onStateChange, zIndex}, ref) => {
    // Theme
    const theme = useContext(ThemeContext);
    const stylesWithTheme = styles(theme);

    // Shared Values
    const translateY = useSharedValue(MIN_TRANSLATE_Y);
    const maximized = useSharedValue(false);

    const state = useSharedValue(BottomSheetState.Min);

    // Callbacks
    const scrollTo = useCallback((destination: number) => {
      'worklet';
      maximized.value = destination === MAX_TRANSLATE_Y;
      translateY.value = withSpring(destination, {damping: 50});
    }, []);

    const minimize = useCallback(() => {
      scrollTo(MIN_TRANSLATE_Y);
    }, []);

    const maximize = useCallback(() => {
      scrollTo(MAX_TRANSLATE_Y);
    }, []);

    useImperativeHandle(ref, () => ({scrollTo, minimize, maximize}), [
      scrollTo,
      minimize,
      maximize,
    ]);

    useDerivedValue(() => {
      runOnJS(onStateChange)(state.value);
    });

    const context = useSharedValue({y: 0});
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(
          Math.min(translateY.value, MIN_TRANSLATE_Y),
          MAX_TRANSLATE_Y,
        );
      })
      .onEnd(() => {
        if (translateY.value > HALF_TRANSLATE_Y) {
          scrollTo(MIN_TRANSLATE_Y);
          state.value = BottomSheetState.Min;
        } else if (translateY.value < HALF_TRANSLATE_Y) {
          scrollTo(MAX_TRANSLATE_Y);
          state.value = BottomSheetState.Max;
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 48, MAX_TRANSLATE_Y],
        [16, 0],
        Extrapolate.CLAMP,
      );
      const height = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y, MIN_TRANSLATE_Y],
        [SCREEN_HEIGHT, SCREEN_HEIGHT - MIN_MAX_DIFF],
      );
      return {
        borderRadius,
        height,
        zIndex,
        transform: [{translateY: translateY.value}],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[stylesWithTheme.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={stylesWithTheme.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = (theme: Theme) =>
  StyleSheet.create({
    bottomSheetContainer: {
      width: '100%',
      backgroundColor: '#fff',
      position: 'absolute',
      top: SCREEN_HEIGHT,
      zIndex: 10,
    },
    line: {
      width: 75,
      height: 4,
      backgroundColor: '#D9D9D9',
      alignSelf: 'center',
      marginVertical: theme.spacing.m,
      borderRadius: 8,
    },
  });

export default BottomSheet;
