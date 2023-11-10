import React from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import {
  Divider,
  Dropdown,
  HStack,
  Icon,
  IconButton,
  VStack,
} from "../../../../components";
import { ThemeContext } from "../../../../contexts/AppContext";
import useStore from "../../../../data/store";
import { DIFFICULTY, Task } from "../../../../data/types";
import { ButtonStyle, TextStyle, Theme } from "../../../../styles";
import { formatIngredientQuantity } from "../../../../utils/format";

export type TaskAvailaleProps = {
  task: Task;
};

const TaskAvailable = (props: TaskAvailaleProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Props
  const task = props.task;

  // State
  // const [refresh, setRefresh] = React.useState(false);
  const [isIngredientOpen, setIsIngredientOpen] =
    React.useState<boolean>(false);
  const [isKitchenwareOpen, setIsKitchenwareOpen] =
    React.useState<boolean>(false);

  // Store
  const loading = useStore((state) => state.taskLoading);
  const commands = useStore((state) => state.commands);

  const handleTaskFinished = () => {
    useStore.setState({ taskLoading: true });
    commands.completeTask();
  };

  const handleTaskReroll = () => {
    useStore.setState({ taskLoading: true });
    commands.rerollTask();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleTaskReroll} />
      }
    >
      <VStack gap={theme.spacing.xl} p={theme.spacing.m}>
        <VStack
          justifyContent="flex-end"
          gap={theme.spacing.xl}
          style={{ flex: 1 }}
        >
          <VStack flexMain={false} gap={theme.spacing.m}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <HStack
              flexMain={false}
              gap={theme.spacing.l}
              style={{ height: theme.spacing.l }}
            >
              <HStack flexMain={false} gap={theme.spacing.s}>
                <Icon name="timer" color={theme.colors.text} size={24} />
                <Text style={styles.timerText}>{`~${task.duration} min`}</Text>
              </HStack>
              <HStack flexMain={false} gap={theme.spacing.s}>
                <Icon name="star" color={theme.colors.highlight2} size={24} />
                <Icon
                  name={
                    task.difficulty > DIFFICULTY.Easy ? "star" : "star-outline"
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
        </VStack>
        <VStack style={{ flex: 1 }}>
          <ScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 8,
              paddingBottom: 56 + 32,
            }}
            style={{
              alignSelf: "stretch",
            }}
          >
            <VStack
              flexMain={false}
              pVH={{ h: theme.spacing.m }}
              gap={isIngredientOpen ? 10 : theme.spacing.l}
            >
              <Dropdown
                title="Ingredients"
                icon="ingredient"
                iconColor={theme.colors.primary}
                isOpen={isIngredientOpen}
                onPress={() => setIsIngredientOpen(!isIngredientOpen)}
                textStyle={styles.dropdownTitle}
              >
                <HStack mAll={{ l: 12 }} gap={theme.spacing.b + 2}>
                  <Divider color={theme.colors.background2} />
                  <VStack>
                    {task.ingredients.length > 0 ? (
                      task.ingredients.map((i, index) => (
                        <HStack
                          key={index}
                          justifyContent="space-between"
                          style={{ height: theme.spacing.xxl }}
                        >
                          <Text style={TextStyle.h4}>{i.name}</Text>
                          <Text style={TextStyle.h4}>
                            {formatIngredientQuantity(i)}
                          </Text>
                        </HStack>
                      ))
                    ) : (
                      <HStack
                        justifyContent="space-between"
                        style={{ height: theme.spacing.xxl }}
                      >
                        <Text style={TextStyle.h4}>None Required</Text>
                      </HStack>
                    )}
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
                <HStack mAll={{ l: 12 }} gap={theme.spacing.b + 2}>
                  <Divider color={theme.colors.background2} />
                  <VStack>
                    {task.kitchenware.length > 0 ? (
                      task.kitchenware.map((k, index) => (
                        <HStack
                          key={index}
                          justifyContent="space-between"
                          style={{ height: theme.spacing.xxl }}
                        >
                          <Text style={TextStyle.h4}>{k.name}</Text>
                          <Text style={TextStyle.h4}>{`${k.quantity}x`}</Text>
                        </HStack>
                      ))
                    ) : (
                      <HStack
                        justifyContent="space-between"
                        style={{ height: theme.spacing.xxl }}
                      >
                        <Text style={TextStyle.h4}>None Required</Text>
                      </HStack>
                    )}
                  </VStack>
                </HStack>
              </Dropdown>
            </VStack>
          </ScrollView>
          <IconButton
            title="FINISHED"
            icon="check-round"
            color="#fff"
            onPress={handleTaskFinished}
            style={styles.completeBtn}
            textStyle={styles.btnText}
            iconStyle={styles.btnIcon}
          />
        </VStack>
      </VStack>
    </ScrollView>
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
      ...TextStyle.bold,
    },
    completeBtn: {
      ...ButtonStyle.primary,
      backgroundColor: theme.colors.primary,
      position: "absolute",
      width: "100%",
      bottom: 0,
    },
    btnIcon: {
      position: "absolute",
      left: theme.spacing.s,
    },
    btnText: {
      ...TextStyle.h2,
      fontWeight: "normal",
      color: "#fff",
    },
    timerText: {
      ...TextStyle.body,
      ...TextStyle.bold,
    },
  });

export default TaskAvailable;
