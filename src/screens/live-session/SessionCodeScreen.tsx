import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { OtpInput, SafeArea, VStack } from "../../components";
import { AppContext, ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  SessionCodeScreenNavigationProp,
  defaultLiveSessionNavigatorParamList,
} from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";

const fiveDigitRegex = /^\d{5}$/;

const SessionCodeScreen = ({
  navigation,
}: {
  navigation: SessionCodeScreenNavigationProp;
}) => {
  const appConfig = React.useContext(AppContext);

  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  // Store
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.sessionLoading);
  const error = useStore((state) => state.sessionError);
  const joinSession = useStore((state) => state.joinSession);
  const joinFakeSession = useStore((state) => state.joinFakeSession);
  const cleanup = useStore((state) => state.resetSessionSlice);

  React.useEffect(() => {
    return () => cleanup();
  }, []);

  const handleInputFilled = (otp: string) => {
    if (appConfig.useFakeData) {
      navigation.navigate("LiveSession", defaultLiveSessionNavigatorParamList);
      joinFakeSession();
      return;
    }

    if (!fiveDigitRegex.test(otp)) {
      setErrorMsg("The provided code must be a 5-digit number.");
      return;
    }

    if (!loading && user) {
      navigation.navigate("LiveSession", defaultLiveSessionNavigatorParamList);
      joinSession(otp, user);
      return;
    }

    setErrorMsg("Something went wrong...");
  };

  return (
    <SafeArea>
      <VStack
        justifyContent="flex-start"
        pVH={{ v: theme.spacing.xxxl }}
        gap={theme.spacing.m}
      >
        <VStack flexMain={false} gap={theme.spacing.s} p={theme.spacing.m}>
          <Text style={TextStyle.h1}>Enter Session Code</Text>
          <Text style={styles.instruction}>
            The session code can be found on the host's device.
          </Text>
        </VStack>
        <VStack
          flexMain={false}
          pVH={{ h: theme.spacing.l }}
          gap={theme.spacing.m}
        >
          <VStack style={{ height: theme.spacing.b }}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </VStack>
          <OtpInput
            pinCount={5}
            onCodeFilled={handleInputFilled}
            codeInputBlurStyle={styles.box}
            codeInputFocusStyle={{ borderColor: theme.colors.highlight }}
          />
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    instruction: {
      ...TextStyle.body,
      textAlign: "center",
    },
    box: {
      width: 50,
      height: 75,
      fontSize: 24,
      textAlign: "center",
      borderWidth: 1.5,
      borderRadius: 4,
      borderColor: theme.colors.textDisabled,
    },
    errorMsg: {
      ...TextStyle.body,
      textAlign: "center",
      color: theme.colors.danger,
    },
  });

export default SessionCodeScreen;
