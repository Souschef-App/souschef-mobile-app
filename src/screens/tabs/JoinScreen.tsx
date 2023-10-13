import React from "react";
import { StyleSheet, Text } from "react-native";
import { Button, SafeArea, TextButton, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { JoinScreenNavigationProp } from "../../navigation/types";
import { Theme } from "../../styles";

const JoinScreen = ({
  navigation,
}: {
  navigation: JoinScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const handleTaskPressed = () => {
    navigation.navigate("Task");
  };

  return (
    <SafeArea>
      <VStack>
        <Text>Enter 5 Digit Code</Text>
        <Text>QR Scanner Soon!</Text>
        <TextButton title="TASK" onPress={handleTaskPressed} />
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default JoinScreen;
