import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeArea, TextButton, VStack } from "../components";
import { ThemeContext } from "../contexts/AppContext";
import { WelcomeScreenNavigationProp } from "../navigation/types";
import { Theme, ButtonStyle } from "../styles";

const WelcomeScreen = ({
  navigation,
}: {
  navigation: WelcomeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Methods
  const login = () => navigation.replace("Login");
  const register = () => navigation.replace("Register");

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
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
      </View>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
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
