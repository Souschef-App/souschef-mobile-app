import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { JoinNavigatorParamList } from "./types";
import { JoinScreen, QRCodeScreen, SessionCodeScreen } from "../screens";

const JoinStack = createNativeStackNavigator<JoinNavigatorParamList>();

const JoinNavigator = () => {
  return (
    <JoinStack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
    >
      <JoinStack.Screen name="JoinSelection" component={JoinScreen} />
      <JoinStack.Screen name="QRCode" component={QRCodeScreen} />
      <JoinStack.Screen name="SessionCode" component={SessionCodeScreen} />
    </JoinStack.Navigator>
  );
};

export default JoinNavigator;
