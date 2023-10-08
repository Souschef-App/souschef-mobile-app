import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Column, Row, SafeArea} from '../components';
import {OpacityPressable, SpringPressable} from '../components/pressable';
import {ThemeContext} from '../contexts/AppContext';
import {WelcomeScreenNavigationProp} from '../navigation/types';
import Logo from '../res/sous_chef.svg';
import {Theme} from '../styles/type';

const WelcomeScreen = ({
  navigation,
}: {
  navigation: WelcomeScreenNavigationProp;
}) => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);

  // Methods
  const login = () => navigation.replace('Login');
  const register = () => navigation.replace('Register');
  return (
    <SafeArea>
      <Column
        justifyContent={'space-between'}
        horizontalResizing="fill"
        verticalResizing="fill"
        paddingHorizontal={theme.spacing.m}
        paddingVertical={theme.spacing.xxl}>
        <Column horizontalResizing="fill">
          <View
            style={{
              width: '100%',
              height: 250,
              alignItems: 'center',
            }}>
            <View style={{aspectRatio: 1}}>
              <Logo width="100%" height="100%" />
            </View>
          </View>
          <Text style={stylesWithTheme.title}>SOUS-CHEF</Text>
        </Column>
        <Column horizontalResizing="fill">
          <Text style={stylesWithTheme.h1}>Welcome!</Text>
          <Text style={stylesWithTheme.h2}>
            We're so happy you decided to try out Sous-Chef.
          </Text>
        </Column>
        <Column horizontalResizing="fill" spacing={theme.spacing.s}>
          <SpringPressable onPress={register} horizontalResizing="fill">
            <Button
              bgColor={theme.colors.primary}
              horizontalResizing="fill"
              verticalResizing="fixed"
              height={64}
              text="Create an account"
              textStyle={stylesWithTheme.buttonText}
            />
          </SpringPressable>
          <Row spacing={theme.spacing.s}>
            <Text style={stylesWithTheme.loginText}>Joined us before?</Text>
            <OpacityPressable onPress={login}>
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
    </SafeArea>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.colors.text,
      fontSize: 48,
      alignSelf: 'stretch',
      textAlign: 'center',
      fontWeight: 'bold',
    },
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

export default WelcomeScreen;
