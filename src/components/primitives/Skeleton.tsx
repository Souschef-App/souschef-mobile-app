import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  colorMode?: "light" | "dark";
  style?: ViewStyle;
};

const defaultSkeletonProps: SkeletonProps = {
  width: "100%",
  height: 32,
  colorMode: "light",
  style: { borderRadius: 8 },
};

const Skeleton = (propsIn: SkeletonProps) => {
  const props = { ...defaultSkeletonProps, ...propsIn };

  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    offset.value = -width;
    offset.value = withRepeat(withTiming(100, { duration: 1000 }), 0);
  };

  const bgColor = props.colorMode === "light" ? "#dcdcdc" : "#2c2c2e";

  return (
    <View
      onLayout={onLayout}
      style={{
        ...props.style,
        width: props.width,
        height: props.height,
        backgroundColor: bgColor,
        overflow: "hidden",
      }}
    >
      <Animated.View style={[style]}>
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0.05)",
            "rgba(0, 0, 0, 0)",
          ]}
          style={{ width: "100%", height: "100%" }}
          start={{ x: 1, y: 1 }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};

export default Skeleton;
