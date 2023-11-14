import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import {
  HStack,
  Icon,
  Input,
  SafeArea,
  SecureInput,
  SvgLocal,
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
import { emailRegex, nameRegex } from "../../utils/regex";

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const [focusedInput, setFocusedInput] = React.useState<string>();

  // Store
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.userLoading);
  const error = useStore((state) => state.userError);
  const register = useStore((state) => state.register);
  const cleanup = useStore((state) => state.resetUserError);

  React.useEffect(() => {
    if (errorMsg !== "" && !error) {
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
      return;
    }

    if (passwordConfirm != password) {
      setErrorMsg("Please make sure your passwords match.");
      return;
    }

    register({ username: name, email, password, passwordConfirm });
  };

  const isFocusedColor = (id: string) =>
    id === focusedInput ? theme.colors.text : theme.colors.textDisabled;

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <VStack justifyContent="flex-end">
        <VStack justifyContent="flex-end">
          <Text style={styles.header}>Create Account</Text>
          <SvgLocal
            name="curve"
            color="white"
            aspectRatio={2 / 1}
            style={{ transform: [{ rotateX: "180deg" }] }}
          />
        </VStack>
        <VStack
          flexMain={false}
          justifyContent="flex-end"
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
            <HStack
              flexMain={false}
              gap={16}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("name"),
              }}
            >
              <Icon name="person" color={isFocusedColor("name")} />
              <ValidationInput
                value={name}
                validationRegex={nameRegex}
                onChangeText={setName}
                onFocus={() => setFocusedInput("name")}
                placeholder="Name"
                style={TextStyle.body}
                containerStyle={{ flex: 1 }}
              />
            </HStack>
            <HStack
              flexMain={false}
              gap={16}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("email"),
              }}
            >
              <Icon name="mail" color={isFocusedColor("email")} />
              <ValidationInput
                value={email}
                validationRegex={emailRegex}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput("email")}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                style={TextStyle.body}
                containerStyle={{ flex: 1 }}
              />
            </HStack>
            <HStack
              flexMain={false}
              gap={16}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("password"),
              }}
            >
              <Icon name="lock" color={isFocusedColor("password")} />
              <SecureInput
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput("password")}
                iconColor={isFocusedColor("password")}
                placeholder="Password"
                style={TextStyle.body}
                containerStyle={{ flex: 1 }}
              />
            </HStack>
            <HStack
              flexMain={false}
              gap={16}
              style={{
                ...InputStyle.underline,
                borderBottomColor: isFocusedColor("confirm_password"),
              }}
            >
              <Icon name="lock" color={isFocusedColor("confirm_password")} />
              <SecureInput
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                onFocus={() => setFocusedInput("confirm_password")}
                iconColor={isFocusedColor("confirm_password")}
                placeholder="Confirm Password"
                style={TextStyle.body}
                containerStyle={{ flex: 1 }}
              />
            </HStack>
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
      color: "#fff",
    },
    errorBox: {
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
