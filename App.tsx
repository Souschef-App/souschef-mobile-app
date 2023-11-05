import React from "react";
import { AppConfig, AppContext, ThemeContext } from "./src/contexts/AppContext";
import RootNavigator from "./src/navigation";
import { theme } from "./src/styles/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  // TODO: Validate token/userID to avoid logging in

  const appConfig: AppConfig = {
    useFakeData: true,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContext.Provider value={appConfig}>
        <ThemeContext.Provider value={theme}>
          <RootNavigator />
        </ThemeContext.Provider>
      </AppContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
