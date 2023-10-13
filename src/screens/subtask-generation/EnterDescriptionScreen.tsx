import React, { useContext, useState } from "react";
import { Input, SafeArea, TextButton, VStack } from "../../components";
import { StyleSheet, Text, TextInput } from "react-native";
import { ButtonStyle, InputStyle, TextStyle, Theme } from "../../styles";
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
    <SafeArea >
      <VStack style={styles.container} gap={20}>
        <Text style={styles.title}>Enter a Task</Text>
        <Input textStyle={styles.input} multiline={true} onChange={setText} value={text} placeholder="Enter Recipe Task" />
        <TextButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={getSuggestions}
          title="Get Suggestions"
        />
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      margin: 5
    },
    buttonText:{
      ...TextStyle.h3,
      color: theme.colors.background,
    },
    input: {
      ...InputStyle.multiline,
      maxWidth: 300
    },
    container: {
      backgroundColor: theme.colors.background,
    },
    title: {
      ...TextStyle.h3,
    },
  });
