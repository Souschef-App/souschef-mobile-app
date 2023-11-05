import React from "react";
import { StyleSheet, Text } from "react-native";
import { HStack, Icon, IconButton, SafeArea, VStack } from "../../components";
import { ThemeContext } from "../../contexts/AppContext";
import useStore from "../../data/store";
import { TASK_STATUS } from "../../data/types/session/enum";
import { FeedScreenNavigationProp } from "../../navigation/types";
import { Theme } from "../../styles";

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

const formatIcon = (status: TASK_STATUS) => {
  switch (status) {
    case TASK_STATUS.Assigned:
      return "clipboard";
    case TASK_STATUS.Completed:
      return "check-round";
    case TASK_STATUS.Rerolled:
      return "dice";
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

  return (
    <SafeArea>
      <VStack justifyContent="flex-start">
        <HStack
          flexMain={false}
          justifyContent="space-between"
          pVH={{ h: theme.spacing.m }}
          style={{ height: theme.spacing.xxxl }}
        >
          <IconButton
            icon="arrow-left"
            iconSize={20}
            onPress={navigation.goBack}
          />
          <IconButton
            title={users.length.toString()}
            icon="group"
            iconSize={24}
            reverseOrder={true}
            onPress={() => {}}
          />
        </HStack>
        <VStack justifyContent="flex-start" p={16} gap={16}>
          {livefeed.map((snapshot, i) => (
            <HStack
              key={i}
              flexMain={false}
              pVH={{ h: 8 }}
              gap={16}
              justifyContent="space-between"
            >
              <Icon name={formatIcon(snapshot.status)} />
              <VStack align="flex-start">
                <Text>
                  {user?.name === snapshot.user.name
                    ? "You"
                    : snapshot.user.name}
                </Text>
                <Text>{snapshot.task.title}</Text>
              </VStack>
              <Text>{formatRelativeTime(snapshot.timestamp)}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) => StyleSheet.create({});

export default FeedScreen;
