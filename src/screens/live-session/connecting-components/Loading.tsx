import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Logo, SafeArea } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";

const Loading = () => {
  const theme = React.useContext(ThemeContext);
  const angle = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${angle.value}deg` }],
  }));

  React.useEffect(() => {
    angle.value = withRepeat(withTiming(360, { duration: 2000 }), 0);
  }, []);

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <Animated.View style={[styles.container, style]}>
        <Logo size={"50%"} />
      </Animated.View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
