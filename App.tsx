import React, { useCallback } from "react";
import { AppConfig, AppContext, ThemeContext } from "./src/contexts/AppContext";
import RootNavigator from "./src/navigation";
import { theme } from "./src/styles/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { MenuProvider } from 'react-native-popup-menu';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const [fontsLoaded, fontError] = useFonts({
    RobotoSlab: require("./src/assets/fonts/RobotoSlab/RobotoSlab-Regular.ttf"),
    "RobotoSlab-Bold": require("./src/assets/fonts/RobotoSlab/RobotoSlab-Bold.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const appConfig: AppConfig = {
    useFakeData: true,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
       
      <AppContext.Provider value={appConfig}>
        <ThemeContext.Provider value={theme}>
          <MenuProvider>
            <RootNavigator />
          </MenuProvider>
        </ThemeContext.Provider>
      </AppContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
