import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeArea} from '../components';
import {
  TaskScreenNavigationProp,
  TaskScreenRouteProp,
} from '../navigation/types';
import {Theme} from '../styles/type';

const TaskScreen = ({
  navigation,
  route,
}: {
  navigation: TaskScreenNavigationProp;
  route: TaskScreenRouteProp;
}) => {
  return (
    <SafeArea>
      <Text>Task Screen</Text>
    </SafeArea>
  );
};

const styles = (theme: Theme) => StyleSheet.create({});

export default TaskScreen;
