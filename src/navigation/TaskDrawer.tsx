import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import {
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import Toast from "react-native-root-toast";

const Drawer = createDrawerNavigator<TaskDrawerNavigatorParamList>();

const toastText = "Are you still there?";
let inactiveTimerID: NodeJS.Timeout;
let kickIntervalID: NodeJS.Timeout;

const TaskDrawerNavigator = () => {
  // Store
  const taskOverdue = useStore((state) => state.taskOverdue);
  const leaveSession = useStore((state) => state.leaveSession);

  // State
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toast, setToast] = React.useState(toastText);

  const panResponderRef = React.useRef<PanResponderInstance | null>(null);

  function clearInactivityTimer() {
    clearTimeout(inactiveTimerID);
    setToastVisible(false);
  }

  function resetInactivityTimer() {
    clearInactivityTimer();
    inactiveTimerID = setTimeout(() => {
      setToastVisible(true);
    }, 120000); // 2 min
  }

  React.useEffect(() => {
    if (taskOverdue) {
      panResponderRef.current = PanResponder.create({
        onStartShouldSetPanResponder: () => {
          resetInactivityTimer();
          return true;
        },
        onMoveShouldSetPanResponder: () => true,
        onShouldBlockNativeResponder: () => false,
      });
      resetInactivityTimer();
    } else {
      panResponderRef.current = null;
      clearInactivityTimer();
    }
  }, [taskOverdue]);

  React.useEffect(() => {
    const startInterval = () => {
      let timeRemaining = 40; // in seconds

      kickIntervalID = setInterval(() => {
        timeRemaining--;

        if (timeRemaining <= 0) {
          clearInterval(kickIntervalID);
          leaveSession();
        } else if (timeRemaining <= 30) {
          setToast(`${toastText} ${timeRemaining}s`);
        }
      }, 1000);
    };

    const stopInterval = () => {
      clearInterval(kickIntervalID);
      setToast(toastText);
    };

    toastVisible ? startInterval() : stopInterval();

    return () => clearInterval(kickIntervalID);
  }, [toastVisible]);

  return (
    <View style={{ flex: 1 }} {...panResponderRef.current?.panHandlers}>
      <Toast visible={toastVisible}>{toast}</Toast>
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
    </View>
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
