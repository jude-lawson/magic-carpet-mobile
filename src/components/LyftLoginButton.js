import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export default class LyftLoginButton extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Button
        raised
        large
        icon={{ name: 'directions-car' }}
        buttonStyle={{
          backgroundColor: '#ab37b6',
          borderRadius: 50
        }}
        onPress={this.props.clickEvent}
        title='Log In With Lyft' />
    );
  }
}
