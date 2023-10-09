import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {SafeArea} from '../../components';
import {ThemeContext} from '../../contexts/AppContext';
import useStore from '../../data/store';
import {
  LoginScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from '../../navigation/types';
import {Theme} from '../../styles/type';

const LoginScreen = ({navigation}: {navigation: LoginScreenNavigationProp}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  // State
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  // Store
  const user = useStore(state => state.user);
  const isLoading = useStore(state => state.loading);
  const error = useStore(state => state.error);
  const clearError = useStore(state => state.clearError);
  const login = useStore(state => state.login);

  React.useEffect(() => {
    setErrorMsg(error || '');
  }, [error]);

  React.useEffect(() => {
    if (user) {
      navigation.replace('HomeStack', defaultHomeStackNavigatorParamList);
    }
    return () => clearError();
  }, [user]);

  // Methods
  const tryLogin = () => {
    setErrorMsg('');

    // Empty fields
    if (email.length === 0 || password.length === 0) {
      setErrorMsg('Please make sure all fields are filled.');
      return;
    }

    login({email, password});
  };

  const gotoRegister = () => navigation.replace('Register');

  // TEMPORARY BYPASS
  const gotoHome = () =>
    navigation.replace('HomeStack', defaultHomeStackNavigatorParamList);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button title="Register" onPress={gotoRegister} />
        <Button title="Bypass" onPress={gotoHome} />
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

export default LoginScreen;
