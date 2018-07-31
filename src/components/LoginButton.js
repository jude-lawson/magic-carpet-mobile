import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { WebBrowser } from 'expo';

import { lyft_client_id } from '../../config'

export default class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.openLogin = this.openLogin.bind(this)
  }

  openLogin() {
    WebBrowser.openBrowserAsync(`https://www.lyft.com/oauth/authorize_app?client_id=${lyft_client_id}&scope=public%20profile%20rides.read%20rides.request%20offline&state=%3Cstate_string%3E&response_type=code`)
  }

  render() {
    return (
      <Button
        raised
        large
        icon={{ name: 'ios-car', type: 'ionicon' }}
        buttonStyle={{
          backgroundColor: '#ab37b6',
          borderWidth: 1,
          borderColor: '#ab37b6',
          borderRadius: 50
        }}
        containerViewStyle={{ borderRadius: 50 }}
        onPress={this.openLogin}
        title='Log In With Lyft' />
    );
  }
}
