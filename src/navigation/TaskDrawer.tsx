import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { Icon, IconButton, SafeArea, VStack } from "../components";
import { ThemeContext } from "../contexts/AppContext";
import useStore from "../data/store";
import {
  FeedScreen,
  InviteScreen,
  TaskScreen,
  TrackerScreen,
} from "../screens";
import { TextStyle, Theme } from "../styles";
import { theme } from "../styles/theme";
import { TaskDrawerNavigatorParamList } from "./types";

const Drawer = createDrawerNavigator<TaskDrawerNavigatorParamList>();

const TaskDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Task"
      screenOptions={{
        drawerType: "slide",
        headerShown: false,
        swipeEnabled: false,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: theme.colors.text,
        drawerLabelStyle: { fontFamily: "RobotoSlab", fontSize: 16 },
        drawerActiveBackgroundColor: theme.colors.text,
        drawerStyle: { backgroundColor: theme.colors.primary },
      }}
    >
      <Drawer.Screen
        name="Task"
        component={TaskScreen}
        options={{
          swipeEnabled: true,
          drawerIcon: ({ color }) => <Icon name="clipboard" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Tracker"
        component={TrackerScreen}
        options={{
          drawerLabel: "Task Tracker",
          drawerIcon: ({ color }) => <Icon name="tracker" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          drawerLabel: "Live Feed",
          drawerIcon: ({ color }) => <Icon name="live" color={color} />,
        }}
      />
      <Drawer.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          drawerIcon: ({ color }) => <Icon name="qr" color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  const leaveSession = useStore((state) => state.leaveSession);

  return (
    <SafeArea backgroundColor={theme.colors.primary}>
      <DrawerContentScrollView {...props}>
        <VStack p={8} flexMain={false}>
          <Text style={TextStyle.h2}>Sous Chef</Text>
        </VStack>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <IconButton
        icon="logout"
        title="Leave Session"
        iconSize={24}
        onPress={leaveSession}
        animation="opacity"
        color={theme.colors.text}
        textStyle={styles.btnText}
        style={styles.btnContainer}
      />
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: theme.spacing.m,
    },
    btnContainer: {
      alignSelf: "stretch",
      justifyContent: "flex-start",
      padding: theme.spacing.s,
      paddingTop: theme.spacing.m,
      margin: theme.spacing.s,
      borderRadius: theme.spacing.xs,
      gap: theme.spacing.l,
    },
    btnText: {
      ...TextStyle.body,
    },
  });

export default TaskDrawerNavigator;
