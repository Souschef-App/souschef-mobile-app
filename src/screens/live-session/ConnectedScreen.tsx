import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, SafeArea, VStack, ValidationInput } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { guestUser } from "../../data/__mocks__";
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
  const [isNameStatusVisible, setIsNameStatusVisible] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    // Show status ONLY if valid
    const isValid = name.length > 2;
    setIsNameStatusVisible(isValid);
    setIsNameValid(isValid);
  }, [name]);

  const handleSubmit = () => {
    if (name.length > 2) {
      // TODO: Generate proper guest with UUID
      const guest = guestUser;
      guest.name = name;
      useStore.setState({ user: guest });
      navigation.replace("Running", defaultTaskDrawerNavigatorParamList);
    } else {
      setIsNameStatusVisible(true);
    }
  };

  return (
    <SafeArea backgroundColor={theme.colors.secondary}>
      <VStack p={theme.spacing.xxxl} gap={16}>
        <Text style={styles.label}>Your name is...</Text>
        <ValidationInput
          validationRegex={nameRegex}
          value={name}
          onChangeText={setName}
          placeholder="Guest Name"
          maxLength={16}
          style={styles.inputText}
          containerStyle={styles.input}
        />
        <Button onPress={handleSubmit} style={styles.button}>
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
