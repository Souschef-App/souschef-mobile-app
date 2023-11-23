import React from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HStack, IconButton, SafeArea, VStack } from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import { TASK_STATUS } from "../../../data/types/enum";
import { TrackerScreenNavigationProp } from "../../../navigation/types";
import { TextStyle, Theme } from "../../../styles";
import { formatRelativeTime } from "../../../utils/format";

const EmptyListItem = () => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <HStack style={styles.feedItem}>
      <Text
        style={[styles.feedItemDetails, { color: theme.colors.textDisabled }]}
      >
        None
      </Text>
    </HStack>
  );
};

const ListItemWBtn = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <HStack
      pVH={{ h: theme.spacing.m }}
      justifyContent="space-between"
      style={styles.feedItem}
    >
      <Text>{title}</Text>
      <IconButton
        icon="check-round"
        iconSize={16}
        title="DONE"
        color={"#fff"}
        onPress={onPress}
        textStyle={styles.doneBtnText}
        style={styles.doneBtn}
      />
    </HStack>
  );
};

const ListItem = ({ title, info }: { title: string; info: string }) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <HStack
      pVH={{ h: theme.spacing.m }}
      justifyContent="space-between"
      style={styles.feedItem}
    >
      <Text>{title}</Text>
      <Text style={styles.feedItemDetails}>{info}</Text>
    </HStack>
  );
};

const TrackerScreen = ({
  navigation,
}: {
  navigation: TrackerScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Store
  const tasks = useStore((state) => state.tasks);
  const completeBackgroundTask = useStore(
    (state) => state.commands.completeBackgroundTask
  );

  const inProgressTasks = Object.entries(tasks)
    .filter(([_, task]) => task.status === TASK_STATUS.InProgress)
    .map(([taskID, task]) => (
      <ListItem
        key={taskID}
        title={task.title}
        info={formatRelativeTime(task.timestamp)}
      />
    ));

  const backgroundTasks = Object.entries(tasks)
    .filter(([_, task]) => task.status === TASK_STATUS.Background)
    .map(([taskID, task]) => (
      <ListItemWBtn
        key={taskID}
        title={task.title}
        onPress={() => completeBackgroundTask(taskID)}
      />
    ));

  const completedTasks = Object.entries(tasks)
    .filter(([_, task]) => task.status === TASK_STATUS.Completed)
    .map(([taskID, task]) => (
      <ListItem
        key={taskID}
        title={task.title}
        info={formatRelativeTime(task.timestamp)}
      />
    ));

  const unassignedTasks = Object.entries(tasks)
    .filter(([_, task]) => task.status === TASK_STATUS.Unassigned)
    .map(([taskID, task]) => (
      <ListItem
        key={taskID}
        title={task.title}
        info={`~${task.duration} min`}
      />
    ));

  return (
    <SafeArea>
      <VStack justifyContent="flex-start">
        <HStack
          flexMain={false}
          justifyContent="flex-start"
          style={styles.appBar}
        >
          <IconButton
            icon="back-arrow"
            color={theme.colors.text}
            iconSize={24}
            onPress={navigation.goBack}
            style={styles.appBarBtn}
          />
        </HStack>
        <ScrollView style={styles.scrollView}>
          <VStack justifyContent="flex-start">
            <HStack justifyContent="flex-start" style={styles.header}>
              <Text style={styles.headerText}>In Progress</Text>
            </HStack>
            <VStack>
              {inProgressTasks.length > 0 ? inProgressTasks : <EmptyListItem />}
            </VStack>
            <HStack justifyContent="flex-start" style={styles.header}>
              <Text style={styles.headerText}>Background</Text>
            </HStack>
            <VStack>
              {backgroundTasks.length > 0 ? backgroundTasks : <EmptyListItem />}
            </VStack>
            <HStack justifyContent="flex-start" style={styles.header}>
              <Text style={styles.headerText}>Completed</Text>
            </HStack>
            <VStack>
              {completedTasks.length > 0 ? completedTasks : <EmptyListItem />}
            </VStack>
            <HStack justifyContent="flex-start" style={styles.header}>
              <Text style={styles.headerText}>Unassigned</Text>
            </HStack>
            <VStack>
              {unassignedTasks.length > 0 ? unassignedTasks : <EmptyListItem />}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    appBar: { height: theme.spacing.xxxl },
    appBarBtn: {
      paddingLeft: theme.spacing.m,
      paddingRight: theme.spacing.m,
      alignSelf: "stretch",
    },
    scrollView: {
      flex: 1,
      alignSelf: "stretch",
    },
    header: {
      paddingHorizontal: theme.spacing.m,
      height: theme.spacing.xxl,
      backgroundColor: theme.colors.highlight,
    },
    headerText: {
      ...TextStyle.body,
      ...TextStyle.bold,
      color: "#fff",
    },
    feedItem: {
      height: theme.spacing.xxl,
      borderBottomWidth: 1,
      borderColor: theme.colors.textDisabled,
    },
    feedItemUser: {
      ...TextStyle.body,
      ...TextStyle.bold,
    },
    feedItemDetails: {
      ...TextStyle.body,
      fontSize: 14,
    },
    feedItemEmpty: {
      ...TextStyle.body,
      color: theme.colors.textDisabled,
    },
    doneBtn: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.s,
      paddingVertical: theme.spacing.xs,
      borderRadius: 64,
    },
    doneBtnText: {
      ...TextStyle.bold,
    },
  });

export default TrackerScreen;
