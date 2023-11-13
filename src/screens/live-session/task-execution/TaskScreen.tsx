import React from "react";
import { StyleSheet } from "react-native";
import { HStack, IconButton, SafeArea } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import {
  TaskScreenNavigationProp,
  defaultBottomTabNavigatorParamList,
} from "../../../navigation/types";
import { Theme } from "../../../styles";
import {
  MealCompleted,
  TaskAvailable,
  TaskSkeleton,
  TaskUnavailable,
} from "./task-components";

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
  const loading = useStore((state) => state.taskLoading);
  const completed = useStore((state) => state.sessionCompleted);
  const connected = useStore((state) => state.clientConnected);
  const leaveSession = useStore((state) => state.leaveSession);

  React.useEffect(() => {
    return () => leaveSession();
  }, []);

  React.useEffect(() => {
    if (!connected) {
      navigation.navigate("Tabs", defaultBottomTabNavigatorParamList);
    }
  }, [connected]);

  const render = () => {
    if (completed) {
      return <MealCompleted />;
    } else if (loading) {
      return <TaskSkeleton />;
    } else if (task) {
      return <TaskAvailable task={task!} />;
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
