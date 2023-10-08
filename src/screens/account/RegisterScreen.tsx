import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Card, Column, Input, Row, SafeArea} from '../../components';
import {OpacityPressable, SpringPressable} from '../../components/pressable';
import {ThemeContext} from '../../contexts/AppContext';
import {
  RegisterScreenNavigationProp,
  defaultHomeStackNavigatorParamList,
} from '../../navigation/types';
import {Theme} from '../../styles/type';
import useStore from '../../data/store';

const RegisterScreen = ({
  navigation,
}: {
  navigation: RegisterScreenNavigationProp;
}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Fields
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  // Store
  const user = useStore(state => state.user);
  const isLoading = useStore(state => state.loading);
  const error = useStore(state => state.error);
  const clearError = useStore(state => state.clearError);
  const register = useStore(state => state.register);

  React.useEffect(() => {
    setErrorMsg(error || '');
  }, [error]);

  React.useEffect(() => {
    if (user) {
      navigation.replace('HomeStack', defaultHomeStackNavigatorParamList);
    }
    return () => clearError();
  }, [user]);

  const tryRegister = () => {
    setErrorMsg('');

    // Empty fields
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    ) {
      setErrorMsg('Please make sure all fields are filled.');
      return;
    }
    // Passwords do not match
    if (password !== passwordConfirm) {
      setErrorMsg('Please make sure your passwords match!');
      return;
    }

    register({username: name, email, password, passwordConfirm});
  };

  const gotoLogin = () => navigation.replace('Login');

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
            <SpringPressable onPress={tryRegister} horizontalResizing="fill">
              <Button
                bgColor={theme.colors.primary}
                loading={isLoading}
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
