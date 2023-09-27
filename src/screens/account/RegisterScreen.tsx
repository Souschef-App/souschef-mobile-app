import React, {useContext, useRef} from 'react';
import {StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
import {AuthContext, ThemeContext} from '../../contexts/AppContext';
import {
  RegisterScreenNavigationProp,
  RegisterScreenRouteProp,
} from '../../navigation/types';
import {Theme} from '../../styles/type';

const RegisterScreen = ({
  navigation,
  route,
}: {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
}) => {
  // User
  const {register, registerSuccess, registerLoading, registerError} =
    useContext(AuthContext);
  const isMounted = useRef(false);

  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    // Only when registering
    if (isMounted.current) {
      if (registerSuccess) {
        navigation.replace('Login', {animationID: 1});
      } else if (registerError) {
        setError(`${registerError}`);
      }
    } else {
      isMounted.current = true;

      // Clear fields
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setError('');

      if (route.params.animationID === 1)
        navigation.setOptions({animation: 'slide_from_right'});
    }
  }, [registerSuccess, registerError]);

  const attemptRegister = () => {
    setError('');
    // Empty fields
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      setError('Please make sure all fields are filled.');
    }
    // Passwords do not match
    else if (password !== passwordConfirm) {
      setError('Please make sure your passwords match!');
    }
    // Successfully registered
    else {
      register({
        json: {
          userName: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
      });
    }
  };

  const gotoLogin = () => navigation.replace('Login', {animationID: 1});

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
            <Text style={stylesWithTheme.h1}>Create an Account</Text>
            <Text style={stylesWithTheme.h2}>You're almost there!</Text>
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
              placeholder="Name"
              horizontalResizing="fill"
              onChangeText={value => {
                setName(value);
              }}
            />
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
            <Input
              bgColor={theme.colors.foreground}
              placeholder="Confirm password"
              secure={true}
              horizontalResizing="fill"
              onChangeText={value => {
                setPasswordConfirm(value);
              }}
            />
          </Column>
          <Column horizontalResizing="fill" spacing={theme.spacing.m}>
            <SpringPressable
              onPress={attemptRegister}
              horizontalResizing="fill">
              <Button
                bgColor={theme.colors.primary}
                loading={registerLoading}
                horizontalResizing="fill"
                verticalResizing="fixed"
                height={64}
                text="Register"
                textStyle={stylesWithTheme.buttonText}
              />
            </SpringPressable>
            <Row spacing={theme.spacing.s}>
              <Text style={stylesWithTheme.loginText}>Joined us before?</Text>
              <OpacityPressable onPress={gotoLogin}>
                <Text
                  style={[
                    stylesWithTheme.loginText,
                    stylesWithTheme.clickableText,
                  ]}>
                  Login
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
      alignSelf: 'stretch',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    h2: {
      color: theme.colors.text,
      fontSize: 18,
      alignSelf: 'stretch',
      textAlign: 'center',
    },
    error: {
      backgroundColor: theme.colors.danger,
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
    loginText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    clickableText: {
      color: '#2A60A6',
    },
  });

export default RegisterScreen;
