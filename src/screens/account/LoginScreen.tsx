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
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  LoginScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from "../../navigation/types";
import { ButtonStyle, TextStyle, Theme, InputStyle } from "../../styles";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

// TODO:
// 1. Implement "forgot password" functionality
// 2. (Optional) Diagonal line UI
const LoginScreen = ({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) => {
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
  const loading = useStore((state) => state.loading);
  const loginError = useStore((state) => state.error);
  const clearError = useStore((state) => state.clearError);
  const login = useStore((state) => state.login);

  const handleEmailFocus = () => {
    setFocusedInput("email");
  };

  const handleEmailBlur = () => {
    // Show email status IF non-empty
    setIsEmailStatusVisible(email.length > 0);
  };

  React.useEffect(() => {
    if (!loginError && errorMsg !== "") {
      setErrorMsg("");
    }

    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    // Show valid email status; invalid email shown onBlur
    if (isValid && !isEmailStatusVisible) {
      setIsEmailStatusVisible(true);
    } else if (isEmailStatusVisible) {
      setIsEmailStatusVisible(false);
    }
  }, [email]);

  React.useEffect(() => {
    if (errorMsg !== "" && !loginError) {
      setErrorMsg("");
    }
  }, [password]);

  // Methods
  const tryLogin = () => {
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

  React.useEffect(() => {
    setErrorMsg(loginError || "");
    if (user) {
      navigation.replace("HomeStack", defaultHomeStackNavigatorParamList);
    }
    // Clear zustand error when leaving/re-rendering
    return () => clearError();
  }, [loginError, user]);

  const isFocusedColor = (id: string) =>
    id === focusedInput ? theme.colors.text : theme.colors.textDisabled;

  return (
    <SafeArea>
      <VStack>
        <VStack style={styles.tophalf}>
          <Text style={styles.header}>Welcome Back</Text>
        </VStack>
        <VStack
          justifyContent="flex-end"
          flexMain={false}
          pVH={{ v: theme.spacing.l, h: theme.spacing.m }}
          gap={32}
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
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
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
              title="Login"
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
    tophalf: {
      backgroundColor: theme.colors.primary,
    },
    header: {
      ...TextStyle.h1,
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
