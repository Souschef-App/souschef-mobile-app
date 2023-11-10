import React from "react";
import { Text } from "react-native";
import { VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import { TextStyle } from "../../../styles";

const TaskUnavailable = () => {
  // Theme
  const theme = React.useContext(ThemeContext);

  const messageTitle = "There are no tasks available";
  const messageDesc = "Please wait for new tasks to become available.";

  return (
    <VStack
      mAll={{ b: theme.spacing.xxxl }} // Offset AppBar
      pVH={{ h: theme.spacing.m }}
      gap={theme.spacing.s}
    >
      <Text style={TextStyle.h2}>{messageTitle}</Text>
      <Text style={TextStyle.h4}>{messageDesc}</Text>
    </VStack>
  );
};

export default TaskUnavailable;
