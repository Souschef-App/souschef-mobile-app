import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import {
  HStack,
  Input,
  SafeArea,
  SecureInput,
  TextButton,
  VStack,
  ValidationInput,
} from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  RegisterScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from "../../navigation/types";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";
import { emailRegex } from "../../utils/regex";

// TODO:
// 1. Implement "forgot password" functionality
// 2. (Optional) Diagonal line UI
const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(false);
  const [isEmailStatusVisible, setIsEmailStatusVisible] =
    React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [focusedInput, setFocusedInput] = React.useState<string>();

  // Store
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.socketLoading);
  const registerError = useStore((state) => state.userError);
  const clearError = useStore((state) => state.clearUserError);
  const register = useStore((state) => state.register);

  const handleEmailFocus = () => {
    setFocusedInput("email");
  };

  const handleEmailBlur = () => {
    // Show email status IF non-empty
    setIsEmailStatusVisible(email.length > 0);
  };

  React.useEffect(() => {
    if (!registerError && errorMsg !== "") {
      setErrorMsg("");
    }

    // Show status ONLY if valid
    const isValid = emailRegex.test(email);
    setIsEmailStatusVisible(isValid);
    setIsEmailValid(isValid);
  }, [email]);

  React.useEffect(() => {
    if (errorMsg !== "" && !registerError) {
      setErrorMsg("");
    }
  }, [password]);

  // Methods
  const tryRegister = () => {
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      setErrorMsg("Please make sure all fields are filled.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setIsEmailStatusVisible(true);
      return;
    }

    if (passwordConfirm != password) {
      setErrorMsg("Please make sure your passwords match.");
      return;
    }

    register({ username: name, email, password, passwordConfirm });
  };

  React.useEffect(() => {
    setErrorMsg(registerError || "");
    if (user) {
      navigation.replace("HomeStack", defaultHomeStackNavigatorParamList);
    }
  }, [registerError, user]);

  React.useEffect(() => {
    // Clear zustand error when onMount
    clearError();
  }, []);

  const isFocusedColor = (id: string) =>
    id === focusedInput ? theme.colors.text : theme.colors.textDisabled;

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <VStack>
        <VStack>
          <Text style={styles.header}>Create Account</Text>
        </VStack>
        <VStack
          justifyContent="flex-end"
          flexMain={false}
          pVH={{ v: theme.spacing.l, h: theme.spacing.m }}
          gap={theme.spacing.l}
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
            <Input
              value={name}
              onChange={setName}
              onFocus={() => setFocusedInput("name")}
              placeholder="Name"
              icon="person"
              iconColor={isFocusedColor("name")}
              textStyle={TextStyle.body}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("name"),
              }}
            />
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
            <SecureInput
              value={passwordConfirm}
              onChange={setPasswordConfirm}
              onFocus={() => setFocusedInput("confirm_password")}
              icon="lock"
              iconColor={isFocusedColor("confirm_password")}
              placeholder="Confirm Password"
              placeholderColor={theme.colors.textDisabled}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("confirm_password"),
              }}
              textStyle={TextStyle.body}
            />
          </VStack>
          <VStack flexMain={false} gap={theme.spacing.m}>
            <TextButton
              title="Register"
              onPress={tryRegister}
              style={styles.login}
              textStyle={styles.loginText}
            />
            <HStack gap={theme.spacing.xs}>
              <Text style={TextStyle.body}>Joined us before?</Text>
              <TextButton
                title="Login"
                onPress={() => navigation.replace("Login")}
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
      backgroundColor: theme.colors.text,
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

export default RegisterScreen;
