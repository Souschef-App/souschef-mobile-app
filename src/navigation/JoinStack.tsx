import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { JoinNavigatorParamList } from "./types";
import { JoinScreen, QRCodeScreen, SessionCodeScreen } from "../screens";

const JoinStack = createNativeStackNavigator<JoinNavigatorParamList>();

const JoinNavigator = () => {
  return (
    <JoinStack.Navigator>
      <JoinStack.Screen
        name="JoinSelection"
        component={JoinScreen}
        options={{ headerShown: false }}
      />
      <JoinStack.Screen
        name="QRCode"
        component={QRCodeScreen}
        options={{ headerShown: false }}
      />
      <JoinStack.Screen
        name="SessionCode"
        component={SessionCodeScreen}
        options={{ headerShown: false }}
      />
    </JoinStack.Navigator>
  );
};

export default JoinNavigator;
