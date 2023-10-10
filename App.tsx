import React from "react";
import { ThemeContext } from "./src/contexts/AppContext";
import RootNavigator from "./src/navigation";
import { theme } from "./src/styles/theme";

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ThemeContext.Provider value={theme}>
      <RootNavigator />
    </ThemeContext.Provider>
  );
};

export default App;
