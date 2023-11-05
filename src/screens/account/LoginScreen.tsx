import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import {
  HStack,
  SafeArea,
  SecureInput,
  TextButton,
  VStack,
  ValidationInput,
} from "../../components";
import { AppContext, ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  LoginScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from "../../navigation/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";
import { emailRegex } from "../../utils/regex";

// TODO:
// 1. Find solution for keyboard pushing UI
// 2. Implement "forgot password" functionality
// 3. Dynamically change screen animation between Login & Register
// 4. Curve line UI
const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
  const appConfig = useContext(AppContext);

  // Theme
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [email, setEmail] = React.useState<string>("");
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(false);
  const [isEmailStatusVisible, setIsEmailStatusVisible] =
    React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [focusedInput, setFocusedInput] = React.useState<string>();

  // Store
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.userLoading);
  const error = useStore((state) => state.userError);
  const login = useStore((state) => state.login);
  const fakeLogin = useStore((state) => state.fakeLogin);
  const cleanup = useStore((state) => state.resetUserSlice);

  React.useEffect(() => {
    // Show status ONLY if valid
    const isValid = emailRegex.test(email);
    setIsEmailStatusVisible(isValid);
    setIsEmailValid(isValid);
  }, [email]);

  React.useEffect(() => {
    if (!error && errorMsg !== "") {
      setErrorMsg("");
    }
  }, [email, password]);

  React.useEffect(() => {
    setErrorMsg(error || "");
  }, [error]);

  React.useEffect(() => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [
          { name: "HomeStack", params: defaultHomeStackNavigatorParamList },
        ],
      });
    }
  }, [user]);

  React.useEffect(() => {
    return () => cleanup();
  }, []);

  // Methods
  const tryLogin = () => {
    if (appConfig.useFakeData) {
      fakeLogin();
      return;
    }

    if (email.length === 0 || password.length === 0) {
      setErrorMsg("Please make sure all fields are filled.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setIsEmailStatusVisible(true);
      return;
    }

    login({ email, password });
  };

  const isFocusedColor = (id: string) =>
    id === focusedInput ? theme.colors.text : theme.colors.textDisabled;

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <VStack>
        <VStack>
          <Text style={styles.header}>Welcome Back</Text>
        </VStack>
        <VStack
          justifyContent="flex-end"
          flexMain={false}
          pVH={{ v: theme.spacing.l, h: theme.spacing.m }}
          gap={32}
          style={styles.card}
        >
          <VStack flexMain={false} gap={theme.spacing.m}>
            <HStack p={theme.spacing.s} style={styles.errorBox}>
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text style={styles.errorMsg}>{errorMsg}</Text>
              )}
            </HStack>
            <ValidationInput
              value={email}
              onChange={setEmail}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setIsEmailStatusVisible(email.length > 0)}
              placeholder="Email"
              keyboardType="email-address"
              isValid={isEmailValid}
              isStatusVisible={isEmailStatusVisible}
              icon="mail"
              iconColor={isFocusedColor("email")}
              textStyle={TextStyle.body}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("email"),
              }}
            />
            <SecureInput
              value={password}
              onChange={setPassword}
              onFocus={() => setFocusedInput("password")}
              icon="lock"
              iconColor={isFocusedColor("password")}
              placeholder="Password"
              placeholderColor={theme.colors.textDisabled}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("password"),
              }}
              textStyle={TextStyle.body}
            />
            <TextButton
              title="Forgot password?"
              onPress={() => {}}
              style={styles.forgotPassContainer}
              textStyle={[TextStyle.body, styles.link]}
            />
          </VStack>
          <VStack flexMain={false} gap={theme.spacing.m}>
            <TextButton
              title="Log In"
              onPress={tryLogin}
              style={styles.login}
              textStyle={styles.loginText}
            />
            <HStack gap={theme.spacing.xs}>
              <Text style={TextStyle.body}>Not a member?</Text>
              <TextButton
                title="Register"
                onPress={() => navigation.replace("Register")}
                textStyle={[TextStyle.body, styles.link]}
              />
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
    },
    header: {
      ...TextStyle.h1,
      color: "#fff",
    },
    errorBox: {
      // backgroundColor: theme.colors.background2,
      borderRadius: 8,
    },
    errorMsg: {
      ...TextStyle.body,
      color: theme.colors.danger,
    },
    forgotPassContainer: {
      alignItems: "flex-end",
      alignSelf: "stretch",
    },
    login: {
      ...ButtonStyle.account,
      backgroundColor: theme.colors.secondary,
      alignSelf: "stretch",
    },
    loginText: {
      ...TextStyle.h3,
      color: "#fff",
    },
    link: {
      color: theme.colors.highlight,
    },
  });

export default LoginScreen;
