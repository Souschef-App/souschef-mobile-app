import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeArea} from '../components';
import {
  RecipeScreenNavigationProp,
  RecipeScreenRouteProp,
} from '../navigation/types';
import {Theme} from '../styles/type';

const RecipeScreen = ({
  navigation,
  route,
}: {
  navigation: RecipeScreenNavigationProp;
  route: RecipeScreenRouteProp;
}) => {
  return (
    <SafeArea>
      <Text>Recipe Screen</Text>
    </SafeArea>
  );
};

const styles = (theme: Theme) => StyleSheet.create({});

export default RecipeScreen;
