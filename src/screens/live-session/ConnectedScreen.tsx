import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, SafeArea, VStack, ValidationInput } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { guestSessionUser } from "../../data/__mocks__";
import useStore from "../../data/store";
import {
  ConnectedScreenNavigationProp,
  defaultTaskDrawerNavigatorParamList,
} from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";
import { nameRegex } from "../../utils/regex";

const ConnectedScreen = ({
  navigation,
}: {
  navigation: ConnectedScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [name, setName] = React.useState<string>("");
  const [isNameValid, setIsNameValid] = React.useState<boolean>(false);

  // Store
  const loginAsGuest = useStore((state) => state.loginAsGuest);
  const setGuestIdentity = useStore((state) => state.commands.setGuestIdentity);

  const handleSubmit = () => {
    if (isNameValid) {
      loginAsGuest(name);
      setGuestIdentity(name);
      navigation.replace("Running", defaultTaskDrawerNavigatorParamList);
    }
  };

  return (
    <SafeArea backgroundColor={theme.colors.secondary}>
      <VStack p={theme.spacing.xxxl} gap={16}>
        <Text style={styles.label}>Your name is...</Text>
        <ValidationInput
          value={name}
          validationRegex={nameRegex}
          onChangeText={setName}
          onValidationChange={setIsNameValid}
          placeholder="Guest Name"
          maxLength={16}
          style={styles.inputText}
          containerStyle={styles.input}
        />
        <Button
          onPress={handleSubmit}
          style={[styles.button, { opacity: isNameValid ? 1 : 0.5 }]}
        >
          <Text style={styles.label}>OK!</Text>
        </Button>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      ...TextStyle.h3,
      color: "#fff",
    },
    input: {
      width: "100%",
      height: theme.spacing.xl,
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingLeft: 16,
      paddingRight: 16,
    },
    inputText: {
      ...TextStyle.body,
      textAlign: "center",
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "stretch",
      height: theme.spacing.xl,
      borderRadius: 8,
      backgroundColor: theme.colors.text,
    },
  });

export default ConnectedScreen;
