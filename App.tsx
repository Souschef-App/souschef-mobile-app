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

  // API Calls
  const {
    post: login,
    data: user,
    success: loginSuccess,
    loading: loginLoading,
    error: loginError,
  } = usePost<User>(ApiUrls.login);
  const {
    post: register,
    error: registerError,
    success: registerSuccess,
    loading: registerLoading,
  } = usePost(ApiUrls.register);

  let dark = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    setDarkMode(dark);
  }, [dark]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginSuccess,
        loginLoading,
        loginError,
        register,
        registerSuccess,
        registerLoading,
        registerError,
      }}>
      <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
        <RootNavigator />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
