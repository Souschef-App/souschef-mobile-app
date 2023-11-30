import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, SafeArea, VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import { TextStyle, ButtonStyle, Theme } from "../../../styles";
import { ConnectingScreenNavigationProp } from "navigation/types";

const Error = ({
  navigation,
}: {
  navigation: ConnectingScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const error = useStore((state) => state.sessionError);

  return (
    <SafeArea backgroundColor={theme.colors.secondary}>
      <VStack gap={theme.spacing.m}>
        <Text style={styles.label}>{error}</Text>
        <Button onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>OKAY</Text>
        </Button>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      ...TextStyle.h2,
      ...TextStyle.weight.regular,
      color: "#fff",
    },
    buttonText: {
      ...TextStyle.h3,
      color: "#fff",
    },
    button: {
      ...ButtonStyle.account,
      backgroundColor: theme.colors.text,
      paddingHorizontal: theme.spacing.xl,
    },
  });

export default Error;
