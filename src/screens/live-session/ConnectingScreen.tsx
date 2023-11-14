import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Logo, SafeArea } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  ConnectingScreenNavigationProp,
  defaultTaskDrawerNavigatorParamList,
} from "../../navigation/types";
import { Theme } from "../../styles";

const TIME_OUT = 10_000;

const ConnectingScreen = ({
  navigation,
}: {
  navigation: ConnectingScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Store
  const user = useStore((state) => state.user);
  const connected = useStore((state) => state.clientConnected);

  const angle = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${angle.value}deg` }],
  }));

  React.useEffect(() => {
    angle.value = withRepeat(withTiming(360, { duration: 2000 }), 0);

    const timeoutID = setTimeout(() => {
      navigation.goBack();
    }, TIME_OUT);

    return () => clearTimeout(timeoutID);
  }, []);

  React.useEffect(() => {
    if (connected) {
      // TEMPORARY
      setTimeout(() => {
        if (user !== null) {
          navigation.replace("Running", defaultTaskDrawerNavigatorParamList);
        } else {
          navigation.replace("Connected");
        }
      }, 1500); // 1.5 sec
    }
  }, [connected]);

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <Animated.View style={[styles.container, style]}>
        <Logo size={"50%"} />
      </Animated.View>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default ConnectingScreen;
