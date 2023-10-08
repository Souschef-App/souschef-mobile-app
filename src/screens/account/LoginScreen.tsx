import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
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
  const stylesWithTheme = styles(theme);

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
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <Column
          horizontalResizing="fill"
          verticalResizing="fill"
          paddingHorizontal={theme.spacing.m}
          paddingVertical={theme.spacing.xl}
          spacing={theme.spacing.xl}>
          <Column horizontalResizing="fill" spacing={theme.spacing.s}>
            <Text style={stylesWithTheme.h1}>Hello Again!</Text>
            <Text style={stylesWithTheme.h2}>
              Welcome back, you've been missed!
            </Text>
          </Column>
          <Column horizontalResizing="fill" spacing={theme.spacing.m}>
            {errorMsg.length > 0 && (
              <Card style={stylesWithTheme.error}>
                <Column horizontalResizing="fill" spacing={theme.spacing.s}>
                  <MaterialCommunityIcon
                    name="cancel"
                    style={stylesWithTheme.errorIcon}
                  />
                  <Text style={stylesWithTheme.errorText}>{errorMsg}</Text>
                </Column>
              </Card>
            )}
            <Input
              bgColor={theme.colors.foreground}
              placeholder="Email"
              horizontalResizing="fill"
              onChangeText={value => {
                setEmail(value);
              }}
            />
            <Input
              bgColor={theme.colors.foreground}
              placeholder="Password"
              secure={true}
              horizontalResizing="fill"
              onChangeText={value => {
                setPassword(value);
              }}
            />
          </Column>
          <Column horizontalResizing="fill" spacing={theme.spacing.m}>
            <SpringPressable onPress={tryLogin} horizontalResizing="fill">
              <Button
                bgColor={theme.colors.danger}
                loading={isLoading}
                horizontalResizing="fill"
                verticalResizing="fixed"
                height={64}
                text="Login"
                textStyle={stylesWithTheme.buttonText}
              />
            </SpringPressable>
            <Row spacing={theme.spacing.s}>
              <Text style={stylesWithTheme.registerText}>Not a member?</Text>
              <OpacityPressable onPress={gotoRegister}>
                <Text
                  style={[
                    stylesWithTheme.registerText,
                    stylesWithTheme.clickableText,
                  ]}>
                  Register
                </Text>
              </OpacityPressable>
            </Row>
            <Row spacing={theme.spacing.s}>
              <Text style={stylesWithTheme.registerText}>DEV ONLY</Text>
              <OpacityPressable onPress={gotoHome}>
                <Text
                  style={[
                    stylesWithTheme.registerText,
                    stylesWithTheme.clickableText,
                  ]}>
                  Home
                </Text>
              </OpacityPressable>
            </Row>
          </Column>
        </Column>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    h1: {
      color: theme.colors.text,
      fontSize: 28,
      fontWeight: 'bold',
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    h2: {
      color: theme.colors.text,
      fontSize: 18,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    error: {
      backgroundColor: theme.colors.primary,
      elevation: 0,
    },
    errorText: {
      color: '#fff',
      fontSize: 16,
    },
    errorIcon: {color: '#fff', fontSize: 36},
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    registerText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    clickableText: {
      color: '#2A60A6',
    },
  });

export default LoginScreen;
