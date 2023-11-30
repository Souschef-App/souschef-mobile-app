import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  HStack,
  Icon,
  IconButton,
  SafeArea,
  VStack,
} from "../../../components";
import { ThemeContext } from "../../../contexts/AppContext";
import useStore from "../../../data/store";
import { FEED_ACTION } from "../../../data/types/session/enum";
import { FeedScreenNavigationProp } from "../../../navigation/types";
import { TextStyle, Theme } from "../../../styles";
import { ScrollView } from "react-native-gesture-handler";
import { formatRelativeTime } from "../../../utils/format";

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

  const renderActionType = (action: FEED_ACTION) => {
    switch (action) {
      case FEED_ACTION.Assignment:
        return <Icon name="clipboard" color={theme.colors.text} />;
      case FEED_ACTION.Completion:
        return <Icon name="check-round" color={theme.colors.success} />;
      case FEED_ACTION.Reroll:
        return <Icon name="reload" color={theme.colors.text} />;
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
                  {renderActionType(snapshot.action)}
                  <VStack align="flex-start">
                    <Text style={styles.feedItemUser}>
                      {user?.id === snapshot.user.id
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
      ...TextStyle.weight.bold,
      color: "#fff",
    },
    feedItem: {
      height: theme.spacing.xxl,
      borderBottomWidth: 1,
      borderColor: theme.colors.textDisabled,
    },
    feedItemUser: {
      ...TextStyle.body,
      ...TextStyle.weight.bold,
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
