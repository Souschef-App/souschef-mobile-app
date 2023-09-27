import React, {useContext, useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
import {AuthContext, ThemeContext} from '../../contexts/AppContext';
import {
  defaultHomeStackNavigatorParamList,
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from '../../navigation/types';
import {Theme} from '../../styles/type';

const LoginScreen = ({
  navigation,
  route,
}: {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}) => {
  // User
  const {user, login, loginSuccess, loginLoading, loginError} =
    useContext(AuthContext);
  const isMounted = useRef(false);

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // Only when user and/or loginError updates
    if (isMounted.current) {
      if (user) {
        navigation.replace('HomeStack', defaultHomeStackNavigatorParamList);
      } else if (loginError) {
        setError(`${loginError}`);
      }
    }
    // First time mount
    else {
      isMounted.current = true;

      // Clear fields
      setEmail('');
      setPassword('');
      setError('');

      if (route.params.animationID === 1) {
        navigation.setOptions({animation: 'slide_from_left'});
      }
    }
  }, [user, loginError]);

  // Methods
  const attemptLogin = () => {
    setError('');
    // Empty fields
    if (email.length === 0 || password.length === 0) {
      setError('Please make sure all fields are filled.');
    }
    // Successfully log'd in
    else {
      login({
        json: {
          email: email,
          password: password,
        },
      });
    }
  };

  const gotoRegister = () => navigation.replace('Register', {animationID: 1});

  return (
    <SafeArea>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{flexGrow: 1}}>
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
            {error.length > 0 && (
              <Card style={stylesWithTheme.error}>
                <Column horizontalResizing="fill" spacing={theme.spacing.s}>
                  <MaterialCommunityIcon
                    name="cancel"
                    style={stylesWithTheme.errorIcon}
                  />
                  <Text style={stylesWithTheme.errorText}>{error}</Text>
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
            <SpringPressable onPress={attemptLogin} horizontalResizing="fill">
              <Button
                bgColor={theme.colors.danger}
                loading={loginLoading}
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
