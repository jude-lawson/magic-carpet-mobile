import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'

import LoginButton from './LoginButton'

const Login = () => {
  return (
    <LoginButton />
  )
}

const styles = StyleSheet.create({
  banner: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontSize: 20,
  }
});

export default Login;
