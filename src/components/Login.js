import React from 'react';
import { Text } from 'react-native-elements'

import LoginButton from './LoginButton'

const Login = () => {
  return (
    <React.Fragment>
      <Text>Welcome to Magic Carpet</Text>
      <Text>An All-In-One Adventure App</Text>
      <LoginButton />
    </React.Fragment>
  )
}

export default Login;
