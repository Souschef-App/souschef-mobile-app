import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Input, SafeArea, TextButton, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import { SessionCodeScreenNavigationProp } from "../../navigation/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";

const SessionCodeScreen = ({
  navigation,
}: {
  navigation: SessionCodeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [sessionCode, setSessionCode] = React.useState<string>("");

  // Store
  const socket = useStore((state) => state.socket);
  const loading = useStore((state) => state.socketLoading);
  const error = useStore((state) => state.socketError);

  React.useEffect(() => {
    if (socket) {
      navigation.push("Task");
    }
  }, [socket]);

  const handleInputOnChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setSessionCode(cleanedText);
  };

  const handleSubmit = () => {
    if (!loading) {
      console.log("Requesting WebSocket IP from REST Server!");
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
              error && <Text style={styles.errorText}>{error}</Text>
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
    errorText: {
      ...TextStyle.body,
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
