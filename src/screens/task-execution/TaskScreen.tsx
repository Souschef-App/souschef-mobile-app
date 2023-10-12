import React from "react";
import { StyleSheet, Text } from "react-native";
import { HStack, SafeArea, VStack, Icon } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { TaskScreenNavigationProp } from "../../navigation/types";
import { Theme, TextStyle } from "../../styles";
import { DIFFICULTY } from "../../api/responses";

const TaskScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const taskName = "Task #1";
  const estimatedTime = 5;
  const taskDesc = "Chop the carrots into thin slices";
  const taskDifficulty = DIFFICULTY.Medium;

  return (
    <SafeArea>
      <VStack>
        <VStack p={theme.spacing.s} gap={theme.spacing.xl}>
          <VStack flexMain={false} gap={theme.spacing.s}>
            <Text style={TextStyle.h1}>{taskName}</Text>
            <HStack flexMain={false} gap={theme.spacing.s}>
              <HStack flexMain={false} gap={theme.spacing.s}>
                <Icon name="timer" color={theme.colors.text} size={24} />
                <Text style={styles.timerText}>{`~${estimatedTime} min`}</Text>
              </HStack>
              <HStack flexMain={false} gap={theme.spacing.s}>
                <Icon name="star" color={theme.colors.highlight2} size={24} />
                <Icon
                  name={
                    taskDifficulty > DIFFICULTY.Easy ? "star" : "star-outline"
                  }
                  color={theme.colors.highlight2}
                  size={24}
                />
                <Icon
                  name={
                    taskDifficulty > DIFFICULTY.Medium ? "star" : "star-outline"
                  }
                  color={theme.colors.highlight2}
                  size={24}
                />
              </HStack>
            </HStack>
          </VStack>
          <Text style={TextStyle.h3}>{taskDesc}</Text>
          <VStack flexMain={false}>
            <Text>Ingredients</Text>
            <Text>Kitchenware</Text>
          </VStack>
        </VStack>
        <VStack p={theme.spacing.s} flexMain={false}>
          <Text>Button #1</Text>
          <Text>Button #2</Text>
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    timerText: {
      ...TextStyle.body,
      fontWeight: "bold",
    },
  });

export default TaskScreen;
