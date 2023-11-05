import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Input, SafeArea, TextButton, VStack } from "../../components";
import { AppContext, ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  SessionCodeScreenNavigationProp,
  defaultTaskDrawerNavigatorParamList,
} from "../../navigation/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";

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
  const [sessionCode, setSessionCode] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  // Store
  const socketConnected = useStore((state) => state.clientConnected);
  const loading = useStore((state) => state.sessionLoading);
  const error = useStore((state) => state.sessionError);
  const joinSession = useStore((state) => state.joinSession);
  const joinFakeSession = useStore((state) => state.joinFakeSession);
  const cleanup = useStore((state) => state.resetSessionSlice);

  React.useEffect(() => {
    if (socketConnected) {
      navigation.push("TaskDrawer", defaultTaskDrawerNavigatorParamList);
    }
  }, [socketConnected]);

  React.useEffect(() => {
    setErrorMsg(error || "");
  }, [error]);

  React.useEffect(() => {
    return () => cleanup();
  }, []);

  const handleInputOnChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setSessionCode(cleanedText);
  };

  const handleSubmit = () => {
    if (appConfig.useFakeData) {
      joinFakeSession();
      return;
    }

    if (!fiveDigitRegex.test(sessionCode)) {
      setErrorMsg("The provided code must be a 5-digit number.");
      return;
    }

    if (!loading) {
      joinSession(parseInt(sessionCode));
    }
  };

  return (
    <SafeArea>
      <VStack>
        <VStack gap={theme.spacing.s} p={theme.spacing.m}>
          <Text style={TextStyle.h1}>Session Code</Text>
          <Text style={TextStyle.body}>
            Enter the session code found on the host's device.
          </Text>
        </VStack>
        <VStack gap={theme.spacing.l}>
          <VStack flexMain={false}>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            )}
          </VStack>
          <Input
            value={sessionCode}
            onChange={handleInputOnChange}
            placeholder="Enter session code"
            keyboardType="number-pad"
            maxLength={5}
            style={styles.input}
            textStyle={styles.inputText}
          />
        </VStack>
        <VStack flexMain={false} p={theme.spacing.m}>
          <TextButton
            title="SUBMIT"
            onPress={handleSubmit}
            style={styles.submit}
            textStyle={styles.submitText}
          />
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    input: {
      ...InputStyle.outline,
      width: "75%",
      //   backgroundColor: "red",
    },
    inputText: {
      ...TextStyle.h3,
      flexGrow: 0,
      textAlign: "center",
      fontWeight: "normal",
    },
    errorMsg: {
      ...TextStyle.body,
      textAlign: "center",
      color: theme.colors.danger,
    },
    submit: {
      ...ButtonStyle.primary,
      alignSelf: "stretch",
      backgroundColor: theme.colors.highlight,
    },
    submitText: {
      ...TextStyle.h3,
      color: theme.colors.background,
    },
  });

export default SessionCodeScreen;
