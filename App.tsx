import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {ApiUrls} from './src/api/constants/ApiConstants';
import {User} from './src/api/responses';
import {AuthContext, ThemeContext} from './src/contexts/AppContext';
import {usePost} from './src/hooks';
import RootNavigator from './src/navigation';
import {darkTheme, theme} from './src/styles/theme';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  let dark = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setDarkMode(dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <RootNavigator />
    </ThemeContext.Provider>
  );
};

export default App;
