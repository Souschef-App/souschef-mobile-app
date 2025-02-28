import React from "react";
import { StyleSheet, Text } from "react-native";
import { HStack, IconButton, SafeArea } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import { TaskScreenNavigationProp } from "../../../navigation/types";
import { TextStyle, Theme } from "../../../styles";
import {
  MealCompleted,
  TaskAvailable,
  TaskSkeleton,
  TaskUnavailable,
} from "./task-components";

let overdueTimerID: NodeJS.Timeout;

const TaskScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Store
  const tasks = useStore((state) => state.tasks);
  const taskID = useStore((state) => state.assignedTask);
  const loading = useStore((state) => state.taskLoading);
  const taskOverdue = useStore((state) => state.taskOverdue);
  const markTaskOverdue = useStore((state) => state.markTaskOverdue);
  const completed = useStore((state) => state.sessionCompleted);
  const connected = useStore((state) => state.clientConnected);
  const leaveSession = useStore((state) => state.leaveSession);

  React.useEffect(() => {
    if (taskID !== null) {
      markTaskOverdue(false);
      clearTimeout(overdueTimerID);

      const task = tasks[taskID];
      const ms = task.duration * 60000; // min → ms
      overdueTimerID = setTimeout(() => {
        markTaskOverdue(true);
      }, ms);
    }
  }, [taskID]);

  React.useEffect(() => {
    return () => leaveSession();
  }, []);

  React.useEffect(() => {
    if (!connected) {
      navigation.popToTop();
    }
  }, [connected]);

  const render = () => {
    if (completed) {
      return <MealCompleted />;
    } else if (loading) {
      return <TaskSkeleton />;
    } else if (taskID && tasks[taskID]) {
      return <TaskAvailable task={tasks[taskID]} />;
    }

    return <TaskUnavailable />;
  };

  return (
    <SafeArea>
      <HStack
        flexMain={false}
        justifyContent="flex-start"
        style={styles.appBar}
      >
        <IconButton
          icon="menu"
          color={theme.colors.text}
          iconSize={24}
          onPress={navigation.openDrawer}
          style={styles.appBarBtn}
        />
      </HStack>
      {taskOverdue ? (
        <HStack flexMain={false} style={styles.overdueBar}>
          <Text style={styles.overdueText}>Task Overdue!</Text>
        </HStack>
      ) : null}
      {render()}
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    appBar: {
      height: theme.spacing.xxxl,
    },
    appBarBtn: {
      paddingLeft: theme.spacing.m,
      paddingRight: theme.spacing.m,
      alignSelf: "stretch",
    },
    overdueBar: {
      height: theme.spacing.xxl,
      backgroundColor: theme.colors.highlight2,
    },
    overdueText: {
      ...TextStyle.h4,
      ...TextStyle.weight.bold,
    },
  });

export default TaskScreen;
