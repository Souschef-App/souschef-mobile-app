import React, { useRef } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput } from "react-native";
import { HStack, Input, SafeArea, TextButton, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import { SessionCodeScreenNavigationProp } from "../../navigation/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";
import { useSessionApi } from "../../hooks/useSessionApi";

const SessionCodeScreen = ({
  navigation,
}: {
  navigation: SessionCodeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);
  const inputRefs = useRef<(TextInput | null)[]>([])
  const { joinMealSession } = useSessionApi()

  // State
  const [sessionCode, setSessionCode] = React.useState<string>("");

  // Store
  const socket = useStore((state) => state.socket);
  const loading = useStore((state) => state.sessionLoading);
  const error = useStore((state) => state.sessionError);
  // const joinSession = useStore((state) => state.joinSession);

  // React.useEffect(() => {
  //   if (socket) {
  //     navigation.push("Task");
  //   }
  // }, [socket]);

  const handleInputOnChange = (num: number, text: string) => {
    if (num >= sessionCode.length) {
      setSessionCode(sessionCode + text);
    }
    else {
      const cleanedText = sessionCode.split('').map((code, i) => num === i ? text : code).join('')
      setSessionCode(cleanedText);
    }
    if (text.length == 1 && num < 4)
      inputRefs.current[num + 1]?.focus()
    if (text.length == 0 && num > 0)
        inputRefs.current[num - 1]?.focus()
  };

  const handleSubmit = () => {
    // navigation.push("Task");
    if (!loading) {
      console.log("Requesting WebSocket IP from REST Server!");
      joinMealSession(sessionCode).then(res => {
        navigation.push("SessionStartScreen", { session: res.data } );
      });
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
          <HStack gap={theme.spacing.m}>
            {[0, 1, 2, 3, 4].map(code => 
            <Input
              key={code}
              ref={(input) => (inputRefs.current.length <= code ? inputRefs.current.push(input) : inputRefs.current[code] = input)}
              value={sessionCode.length > code ? sessionCode.split('')[code] : ""}
              onChange={(text) => handleInputOnChange(code, text)}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              style={styles.input}
              textStyle={styles.inputText}
            />)}
          </HStack>
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
      width: "10%",
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
