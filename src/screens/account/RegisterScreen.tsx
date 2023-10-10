import React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { SafeArea } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import {
  RegisterScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from "../../navigation/types";
import { Theme } from "../../styles/types";

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Fields
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  // Store
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const clearError = useStore((state) => state.clearError);
  const register = useStore((state) => state.register);

  React.useEffect(() => {
    setErrorMsg(error || "");
  }, [error]);

  React.useEffect(() => {
    if (user) {
      navigation.replace("HomeStack", defaultHomeStackNavigatorParamList);
    }
    return () => clearError();
  }, [user]);

  const tryRegister = () => {
    setErrorMsg("");

    // Empty fields
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      setErrorMsg("Please make sure all fields are filled.");
      return;
    }
    // Passwords do not match
    if (password !== passwordConfirm) {
      setErrorMsg("Please make sure your passwords match!");
      return;
    }

    register({ username: name, email, password, passwordConfirm });
  };

  const gotoLogin = () => navigation.replace("Login");

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Register Screen</Text>
        <Button title="Login" onPress={gotoLogin} />
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
  });

export default RegisterScreen;
