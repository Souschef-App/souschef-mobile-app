import React, { useContext, useState } from "react";
import { SafeArea, TextButton, VStack } from "../../components";
import { StyleSheet, Text, TextInput } from "react-native";
import { ButtonStyle, TextStyle, Theme } from "../../styles";
import { ThemeContext } from "../../contexts/AppContext";
import { EnterDescriptionScreenNavigationProp } from "../../navigation/types";

export const EnterDescriptionScreen = ({
  navigation,
}: {
  navigation: EnterDescriptionScreenNavigationProp;
}) => {
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const [text, setText] = useState("");

  const getSuggestions = () => {
    navigation.navigate("TaskBreakDownResultScreen");
  };

  return (
    <SafeArea>
      <VStack style={styles.container}>
        <Text style={styles.title}>EnterDescriptionScreen</Text>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <TextButton style={styles.button} textStyle={styles.title} onPress={getSuggestions} title="Get Suggestions" />
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      color: theme.colors.background,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 300,
      backgroundColor: "#77777755",
    },
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      ...TextStyle.header,
    },
  });
