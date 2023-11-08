import { ThemeContext } from "../../contexts/AppContext";
import React from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { HStack, IconButton, SafeArea } from "../../components";
import useStore from "../../data/store";
import { TaskScreenNavigationProp } from "../../navigation/types";
import {
  MealCompleted,
  TaskAvailable,
  TaskUnavailable,
} from "./task-components";
import { Theme } from "../../styles";

// TODO:
// 1. Prevent dropdowns from moving other components
// 3. Handle empty ingredients or kitchenware
const TaskScreen = ({
  navigation,
}: {
  navigation: TaskScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Store
  const task = useStore((state) => state.assignedTask);
  const completed = useStore((state) => state.sessionCompleted);
  const leaveSession = useStore((state) => state.leaveSession);

  React.useEffect(() => {
    return () => leaveSession();
  }, []);

  const render = () => {
    if (completed) {
      return <MealCompleted />;
    }

    if (task) {
      return <TaskAvailable task={task} />;
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
          onPress={() => navigation.openDrawer()}
          style={styles.appBarBtn}
        />
      </HStack>
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
  });

export default TaskScreen;
