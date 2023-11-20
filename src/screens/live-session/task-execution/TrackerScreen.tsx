import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Dropdown,
  HStack,
  IconButton,
  SafeArea,
  VStack,
} from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import { TrackerScreenNavigationProp } from "../../../navigation/types";
import { TextStyle, Theme } from "../../../styles";
import { TASK_STATUS } from "../../../data/types/enum";

const TrackerScreen = ({
  navigation,
}: {
  navigation: TrackerScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [inProgressOpen, setInProgressOpen] = React.useState(true);
  const [backgroundOpen, setBackgroundOpen] = React.useState(true);
  const [completedOpen, setCompletedOpen] = React.useState(true);
  const [unassignedOpen, setUnassignedOpen] = React.useState(true);

  // Store
  const tasks = useStore((state) => state.tasks);

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
          <VStack justifyContent="flex-start" gap={8}>
            <Dropdown
              title="In Progress"
              isOpen={inProgressOpen}
              onPress={() => setInProgressOpen(!inProgressOpen)}
              textStyle={styles.headerText}
              style={styles.header}
            >
              <VStack>
                {Object.entries(tasks)
                  .filter(([_, task]) => task.status === TASK_STATUS.InProgress)
                  .map(([taskID, task]) => (
                    <Text key={taskID}>{task.title}</Text>
                  ))}
              </VStack>
            </Dropdown>
            <Dropdown
              title="Background"
              isOpen={backgroundOpen}
              onPress={() => setBackgroundOpen(!backgroundOpen)}
              textStyle={styles.headerText}
              style={styles.header}
            >
              <VStack>
                {Object.entries(tasks)
                  .filter(([_, task]) => task.status === TASK_STATUS.Background)
                  .map(([taskID, task]) => (
                    <Text key={taskID}>{task.title}</Text>
                  ))}
              </VStack>
            </Dropdown>
            <Dropdown
              title="Completed"
              isOpen={completedOpen}
              onPress={() => setCompletedOpen(!completedOpen)}
              textStyle={styles.headerText}
              style={styles.header}
            >
              <VStack>
                {Object.entries(tasks)
                  .filter(([_, task]) => task.status === TASK_STATUS.Completed)
                  .map(([taskID, task]) => (
                    <Text key={taskID}>{task.title}</Text>
                  ))}
              </VStack>
            </Dropdown>
            <Dropdown
              title="Unassigned"
              isOpen={unassignedOpen}
              onPress={() => setUnassignedOpen(!unassignedOpen)}
              textStyle={styles.headerText}
              style={styles.header}
            >
              <VStack>
                {Object.entries(tasks)
                  .filter(([_, task]) => task.status === TASK_STATUS.Unassigned)
                  .map(([taskID, task]) => (
                    <HStack
                      pVH={{ h: 16 }}
                      justifyContent="flex-start"
                      style={styles.feedItem}
                    >
                      <Text key={taskID}>{task.title}</Text>
                    </HStack>
                  ))}
              </VStack>
            </Dropdown>
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
  });

export default TrackerScreen;
