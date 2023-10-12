import React from "react";
import { ThemeContext } from "./src/contexts/AppContext";
import RootNavigator from "./src/navigation";
import { theme } from "./src/styles/theme";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  // TODO: Validate token/userID to avoid logging in

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContext.Provider value={theme}>
          <RootNavigator />
      </ThemeContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
