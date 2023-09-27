import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Button, Row} from '../../components';
import Box from '../../components/primitives/Box';
import {SignupScreenNavigationProp} from '../../navigation/types';

const LoginScreen = ({navigation, route}: SignupScreenNavigationProp) => {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [passwordConfirm, onChangePasswordConfirm] = React.useState('');
  const [error, setError] = React.useState('');

  const signup = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, paddingTop: 10}}>

      <Row justifyContent='flex-start' ><Text>Hey</Text><Text>Hey</Text><Text>Hey</Text></Row>
        
      <Text>Signup</Text>
      <Text>{error}</Text>
      <Input onChangeText={onChangeEmail} value={email} placeholder={'Email'} />
      <Input onChangeText={onChangeName} value={name} placeholder={'Name'} />
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder={'Password'}
      />
      <Input
        onChangeText={onChangePasswordConfirm}
        value={passwordConfirm}
        placeholder={'Confirm Password'}
      />
      <Button title="Signup" bgColor="#2E9DFB" textColor='#ffffff' onPress={() => signup()} />
      <Text style={styles.title}>Already A Member<Text style={styles.link} onPress={()=>navigation.navigate('Login')}> Login </Text></Text>   
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },

});


export default LoginScreen;
