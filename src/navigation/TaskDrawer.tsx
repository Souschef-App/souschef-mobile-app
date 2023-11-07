import { createDrawerNavigator } from "@react-navigation/drawer";
import { TaskScreen, FeedScreen, InviteScreen } from "../screens";
import { TaskDrawerNavigatorParamList } from "./types";

const Drawer = createDrawerNavigator<TaskDrawerNavigatorParamList>();

const TaskDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Task"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="Task"
        component={TaskScreen}
        options={{ swipeEnabled: true, drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen name="Feed" component={FeedScreen} />
      <Drawer.Screen name="Invite" component={InviteScreen} />
    </Drawer.Navigator>
  );
};

export default TaskDrawerNavigator;
