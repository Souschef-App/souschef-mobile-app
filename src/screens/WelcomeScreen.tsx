import React from "react";
import { StyleSheet, Text } from "react-native";
import { Icon, SafeArea, TextButton, VStack } from "../components";
import { ThemeContext } from "../contexts/AppContext";
import { WelcomeScreenNavigationProp } from "../navigation/types";
import { ButtonStyle, Theme, TextStyle } from "../styles";

const WelcomeScreen = ({
  navigation,
}: {
  navigation: WelcomeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Methods
  const login = () => navigation.navigate("Login");
  const register = () => navigation.navigate("Register");

  return (
    <SafeArea>
      <VStack
        pVH={{ v: theme.spacing.l, h: theme.spacing.m }}
        style={styles.root}
      >
        <VStack>
          <Icon name="logo" size={256} />
        </VStack>
        <VStack flexMain={false} rowGap={theme.spacing.l}>
          <VStack align="flex-start" rowGap={theme.spacing.s}>
            <Text style={styles.appName}>Sous Chef</Text>
            <VStack align="flex-start">
              <Text style={styles.message}>The ultimate group cooking</Text>
              <Text style={styles.message}>experience</Text>
            </VStack>
          </VStack>
          <VStack rowGap={theme.spacing.m}>
            <TextButton
              title="Login"
              onPress={login}
              style={styles.login}
              textStyle={styles.buttonText}
            />
            <TextButton
              title="Register"
              onPress={register}
              style={styles.register}
              textStyle={styles.buttonText}
            />
          </VStack>
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.colors.primary,
    },
    appName: {
      ...TextStyle.h1,
    },
    message: { ...TextStyle.h3 },
    buttonText: {
      color: "#fff",
      fontSize: 20,
    },
    login: {
      ...ButtonStyle.account,
      backgroundColor: theme.colors.secondary,
      alignSelf: "stretch",
    },
    register: {
      ...ButtonStyle.account,
      backgroundColor: theme.colors.text,
      alignSelf: "stretch",
    },
  });

export default WelcomeScreen;
