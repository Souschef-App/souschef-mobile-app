import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  Divider,
  Dropdown,
  HStack,
  Icon,
  IconButton,
  SafeArea,
  VStack,
} from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import { COOKING_UNIT, DIFFICULTY, Task } from "../../data/types";
import { TaskScreenNavigationProp } from "../../navigation/types";
import { ButtonStyle, TextStyle, Theme } from "../../styles";
import { formatIngredientQuantity } from "../../utils/format";
import useStore from "../../data/store";

// TODO:
// 1. Prevent dropdowns from moving other components
// 2. Live feed floating button
// 3. Handle empty ingredients or kitchenware
// 4. Abstract bubbles (top left)
const TaskScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [isIngredientOpen, setIsIngredientOpen] =
    React.useState<boolean>(false);
  const [isKitchenwareOpen, setIsKitchenwareOpen] =
    React.useState<boolean>(false);

  // Store
  const task = useStore((state) => state.assignedTask);
  const commands = useStore((state) => state.commands);
  const stopConnection = useStore((state) => state.stopConnection);

  // const messageTitle = "No more tasks";
  // const messageDesc = "Thanks for your hard work!";
  const messageTitle = "There are no tasks available";
  const messageDesc = "Please wait for new tasks to become available.";

  React.useEffect(() => {
    return () => stopConnection();
  }, []);

  const handleTaskFinished = () => commands.completeTask();
  const handleTaskReroll = () => commands.startSession();

  return (
    <SafeArea>
      <VStack p={theme.spacing.s}>
        {task ? (
          <>
            <VStack pVH={{ h: theme.spacing.s }} gap={theme.spacing.xl}>
              <VStack flexMain={false} gap={theme.spacing.s}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <HStack
                  flexMain={false}
                  gap={theme.spacing.m}
                  style={{ height: theme.spacing.l }}
                >
                  <HStack flexMain={false} gap={theme.spacing.s}>
                    <Icon name="timer" color={theme.colors.text} size={24} />
                    <Text
                      style={styles.timerText}
                    >{`~${task.duration} min`}</Text>
                  </HStack>
                  <Divider thickness={3} color={theme.colors.background2} />
                  <HStack flexMain={false} gap={theme.spacing.s}>
                    <Icon
                      name="star"
                      color={theme.colors.highlight2}
                      size={24}
                    />
                    <Icon
                      name={
                        task.difficulty > DIFFICULTY.Easy
                          ? "star"
                          : "star-outline"
                      }
                      color={theme.colors.highlight2}
                      size={24}
                    />
                    <Icon
                      name={
                        task.difficulty > DIFFICULTY.Medium
                          ? "star"
                          : "star-outline"
                      }
                      color={theme.colors.highlight2}
                      size={24}
                    />
                  </HStack>
                </HStack>
              </VStack>
              <Text style={TextStyle.h3}>{task.description}</Text>
              <VStack
                flexMain={false}
                pVH={{ h: theme.spacing.m }}
                gap={isIngredientOpen ? 10 : theme.spacing.l}
              >
                <Dropdown
                  title="Ingredient"
                  icon="ingredient"
                  iconColor={theme.colors.primary}
                  isOpen={isIngredientOpen}
                  onPress={() => setIsIngredientOpen(!isIngredientOpen)}
                  textStyle={styles.dropdownTitle}
                >
                  <HStack
                    mAll={{ l: theme.spacing.s, r: theme.spacing.xs }}
                    gap={theme.spacing.b}
                  >
                    <Divider color={theme.colors.background2} />
                    <VStack
                      pVH={{ v: theme.spacing.s }}
                      align="flex-start"
                      gap={theme.spacing.b}
                    >
                      {task.ingredients.map((i, index) => (
                        <HStack justifyContent="space-between" key={index}>
                          <Text style={TextStyle.h4}>{i.name}</Text>
                          <Text style={TextStyle.h4}>
                            {formatIngredientQuantity(i)}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </HStack>
                </Dropdown>
                <Dropdown
                  title="Kitchenware"
                  icon="kitchenware"
                  iconColor={theme.colors.text}
                  isOpen={isKitchenwareOpen}
                  onPress={() => setIsKitchenwareOpen(!isKitchenwareOpen)}
                  textStyle={styles.dropdownTitle}
                >
                  <HStack mVH={{ h: theme.spacing.s }} gap={theme.spacing.b}>
                    <Divider color={theme.colors.background2} />
                    <VStack
                      pVH={{ v: theme.spacing.s }}
                      align="flex-start"
                      gap={theme.spacing.b}
                    >
                      {task.kitchenware.map((k, index) => (
                        <HStack justifyContent="space-between" key={index}>
                          <Text style={TextStyle.h4}>{k.name}</Text>
                          <Text style={TextStyle.h4}>{`${k.quantity}x`}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </HStack>
                </Dropdown>
              </VStack>
            </VStack>
            <VStack flexMain={false} p={theme.spacing.s} gap={theme.spacing.s}>
              <IconButton
                title="FINISHED"
                icon="check-round"
                iconColor="#fff"
                onPress={handleTaskFinished}
                style={styles.completeBtn}
                textStyle={styles.btnText}
                iconStyle={styles.btnIcon}
              />
              <IconButton
                title="RE-ROLL"
                icon="dice"
                iconColor="#fff"
                onPress={handleTaskReroll}
                style={styles.rerollBtn}
                textStyle={styles.btnText}
                iconStyle={styles.btnIcon}
              />
            </VStack>
          </>
        ) : (
          <VStack gap={8}>
            <Text style={TextStyle.h2}>{messageTitle}</Text>
            <Text style={TextStyle.h4}>{messageDesc}</Text>
          </VStack>
        )}
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    taskTitle: {
      ...TextStyle.h1,
      fontSize: 40,
    },
    dropdownTitle: {
      ...TextStyle.h3,
      fontWeight: "bold",
    },
    completeBtn: {
      ...ButtonStyle.primary,
      alignSelf: "stretch",
      backgroundColor: theme.colors.primary,
    },
    rerollBtn: {
      ...ButtonStyle.primary,
      alignSelf: "stretch",
      backgroundColor: theme.colors.highlight,
    },
    btnIcon: {
      position: "absolute",
      left: theme.spacing.m,
    },
    btnText: {
      ...TextStyle.h2,
      fontWeight: "normal",
      color: "#fff",
    },
    timerText: {
      ...TextStyle.body,
      fontWeight: "bold",
    },
  });

export default TaskScreen;
