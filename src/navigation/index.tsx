import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeStackNavigator from "./WelcomeStack";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <WelcomeStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
