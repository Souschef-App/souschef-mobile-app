import React from 'react';
import {View, Text, Button} from 'react-native';
import {HomeScreenNavigationProp} from '../navigation/types';

const HomeScreen = ({navigation, route}: HomeScreenNavigationProp) => {
  return (
    <View style={{flex: 1, paddingTop: 10}}>
      <Text>Home</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      {/* <Button
        title="Meal Prep"
        onPress={() => navigation.navigate('PreMealListScreen')}
      /> */}
      <Button
        title="Task"
        onPress={() => navigation.navigate('TaskScreen', {name: 'Task #1'})}
      />
    </View>
  );
};

export default HomeScreen;
