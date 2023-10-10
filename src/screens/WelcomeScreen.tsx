import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {SafeArea} from '../components';
import {ThemeContext} from '../contexts/AppContext';
import {WelcomeScreenNavigationProp} from '../navigation/types';
import {Theme} from '../styles/type';

const WelcomeScreen = ({
  navigation,
}: {
  navigation: WelcomeScreenNavigationProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // Methods
  const login = () => navigation.replace('Login');
  const register = () => navigation.replace('Register');

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
        <Button title="Login" onPress={login} />
        <Button title="Register" onPress={register} />
      </View>
    </SafeArea>
  );
};

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default WelcomeScreen;
