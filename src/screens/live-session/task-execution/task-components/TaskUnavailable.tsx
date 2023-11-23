import React from "react";
import { Text } from "react-native";
import { VStack } from "../../../../components";
import { ThemeContext } from "../../../../contexts/AppContext";
import { TextStyle } from "../../../../styles";

const TaskUnavailable = () => {
  // Theme
  const theme = React.useContext(ThemeContext);

  const messageTitle = "There are no tasks currently available";
  const messageDesc =
    "Please wait for new tasks to become available. Meanwhile, remember to check for any ongoing background tasks.";

  return (
    <VStack
      mAll={{ b: theme.spacing.xxxl }} // Offset AppBar
      pVH={{ h: theme.spacing.m }}
      gap={theme.spacing.l}
    >
      <Text style={[TextStyle.h2, { textAlign: "center" }]}>
        {messageTitle}
      </Text>
      <Text style={[TextStyle.h4, { textAlign: "center" }]}>{messageDesc}</Text>
    </VStack>
  );
};

export default TaskUnavailable;
