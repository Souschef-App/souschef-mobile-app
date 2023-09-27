import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ThemeContext} from '../../contexts/AppContext';
import {SafeArea} from '../../components';
import {Theme} from '../../styles/type';

const FavoriteScreen = () => {
  // Theme
  const theme = useContext(ThemeContext);
  const stylesWithTheme = styles(theme);
  return (
    <SafeArea>
      <Text>Favorite Screen</Text>
    </SafeArea>
  );
};

const styles = (theme: Theme) => StyleSheet.create({});

export default FavoriteScreen;
