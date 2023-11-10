import React from "react";
import { StyleSheet, Text } from "react-native";
import { HStack, Icon, IconButton, SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import { TASK_STATUS } from "../../data/types/session/enum";
import { FeedScreenNavigationProp } from "../../navigation/types";
import { TextStyle, Theme } from "../../styles";
import { ScrollView } from "react-native-gesture-handler";

const formatRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - timestamp.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};
const FeedScreen = ({
  navigation,
}: {
  navigation: FeedScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Store
  const user = useStore((state) => state.user);
  const users = useStore((state) => state.connectedUsers);
  const livefeed = useStore((state) => state.livefeed);

  const renderActionType = (status: TASK_STATUS) => {
    switch (status) {
      case TASK_STATUS.Assigned:
        return <Icon name="clipboard" color={theme.colors.text} />;
      case TASK_STATUS.Completed:
        return <Icon name="check-round" color={theme.colors.success} />;
      case TASK_STATUS.Rerolled:
        return <Icon name="dice" color={theme.colors.text} />;
    }
  };

  return (
    <SafeArea>
      <VStack justifyContent="flex-start">
        <HStack
          flexMain={false}
          justifyContent="space-between"
          style={styles.appBar}
        >
          <IconButton
            icon="back-arrow"
            color={theme.colors.text}
            iconSize={24}
            onPress={navigation.goBack}
            style={styles.appBarBtn}
          />
          <IconButton
            title={users.length.toString()}
            color={theme.colors.text}
            icon="group"
            iconSize={24}
            onPress={() => {}}
            style={{ ...styles.appBarBtn, flexDirection: "row-reverse" }}
          />
        </HStack>
        <VStack justifyContent="flex-start">
          <HStack
            flexMain={false}
            justifyContent="space-between"
            pVH={{ h: theme.spacing.m, v: theme.spacing.s }}
            style={styles.feedHeader}
          >
            <Text style={styles.feedHeaderTitle}>Live Feed</Text>
          </HStack>
          <ScrollView style={styles.scrollView}>
            {livefeed.length > 0 ? (
              livefeed.map((snapshot, i) => (
                <HStack
                  key={i}
                  flexMain={false}
                  pVH={{ h: 16 }}
                  gap={16}
                  justifyContent="space-between"
                  style={styles.feedItem}
                >
                  {renderActionType(snapshot.status)}
                  <VStack align="flex-start">
                    <Text style={styles.feedItemUser}>
                      {user?.name === snapshot.user.name
                        ? "You"
                        : snapshot.user.name}
                    </Text>
                    <Text style={styles.feedItemDetails}>
                      {snapshot.task.title}
                    </Text>
                  </VStack>
                  <Text style={styles.feedItemDetails}>
                    {formatRelativeTime(snapshot.timestamp)}
                  </Text>
                </HStack>
              ))
            ) : (
              <HStack
                flexMain={false}
                style={{ ...styles.feedItem, borderBottomWidth: 0 }}
              >
                <Text style={styles.feedItemEmpty}>No Activity Yet</Text>
              </HStack>
            )}
          </ScrollView>
        </VStack>
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
    feedHeader: {
      height: theme.spacing.xxl,
      backgroundColor: theme.colors.highlight,
    },
    feedHeaderTitle: {
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

export default FeedScreen;
