import { View, Text, StyleSheet } from "react-native";
import { HStack } from "./primitives/Stack";
import Button from "./primitives/Button";
import { ThemeContext } from "../contexts/AppContext";
import React from "react";
import { Theme, TextStyle } from "../styles";
import Icon, { IconNames } from "./primitives/Icon";

export interface TabItem {
  label: string;
  icon: IconNames;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabPress }) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <HStack flexMain={false} style={styles.tabs}>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          animation="opacity"
          onPress={() => onTabPress(index)}
          style={[styles.tab, activeTab === index && styles.activeTab]}
        >
          <Icon
            name={tab.icon}
            size={16}
            color={activeTab === index ? "#fff" : theme.colors.textDisabled}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === index && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </Button>
      ))}
    </HStack>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    tabs: {
      height: 48,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRadius: 4,
      padding: 4,
    },
    tab: {
      flex: 1,
      flexDirection: "row",
      gap: 8,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
    },
    activeTab: {
      backgroundColor: theme.colors.text,
    },
    tabText: {
      ...TextStyle.body,
      color: theme.colors.textDisabled,
    },
    activeTabText: {
      color: "#fff",
    },
  });

export default Tabs;
