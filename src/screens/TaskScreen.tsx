import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeArea} from '../components';
import {
  TaskScreenNavigationProp,
  TaskScreenRouteProp,
} from '../navigation/types';
import {Theme} from '../styles/type';
import {ThemeContext} from '../contexts/AppContext';

const TaskScreen = ({
  navigation,
  route,
}: {
  navigation: TaskScreenNavigationProp;
  route: TaskScreenRouteProp;
}) => {
  // Theme
  const theme = React.useContext(ThemeContext);
  const styles = React.useMemo(() => makeStyles(theme), [theme]);

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Task Screen</Text>
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

export default TaskScreen;
