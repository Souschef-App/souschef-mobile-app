import React from "react";
import { Text } from "react-native";
import { SafeArea, VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import { TextStyle } from "../../../styles";

const MealCompleted = () => {
  // Theme
  const theme = React.useContext(ThemeContext);

  const messageTitle = "No more tasks";
  const messageDesc = "Thanks for your hard work!";

  return (
    <SafeArea>
      <VStack gap={theme.spacing.s}>
        <Text style={TextStyle.h2}>{messageTitle}</Text>
        <Text style={TextStyle.h4}>{messageDesc}</Text>
      </VStack>
    </SafeArea>
  );
};

export default MealCompleted;
