import React from "react";
import { StyleSheet, Text } from "react-native";
import { IconButton, Logo, SafeArea, TextButton, VStack } from "../components";
import { ThemeContext } from "../contexts/AppContext";
import {
  WelcomeScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from "../navigation/types";
import { ButtonStyle, TextStyle, Theme } from "../styles";
import { StackActions } from "@react-navigation/native";

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
    <SafeArea backgroundColor={theme.colors.primary}>
      <IconButton
        icon="qr"
        iconSize={48}
        onPress={() =>
          navigation.push("HomeStack", {
            screen: "QRCode",
            params: defaultHomeStackNavigatorParamList,
          })
        }
        style={styles.floatingBtn}
      />
      <VStack pVH={{ v: theme.spacing.l, h: theme.spacing.m }}>
        <VStack>
          <Logo size={"66%"} />
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
              title="Log In"
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
    appName: {
      ...TextStyle.h1,
      color: "#fff",
    },
    message: { ...TextStyle.h3 },
    buttonText: {
      ...TextStyle.h3,
      color: "#fff",
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
    floatingBtn: {
      ...ButtonStyle.floating,
      backgroundColor: "#fff",
      top: 32,
      right: 16,
    },
  });

export default WelcomeScreen;
