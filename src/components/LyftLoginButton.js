import React, { Component } from 'react';
import { Button } from 'react-native-elements';


export class LyftLoginButton extends Component {
  constructor(props) {
    super(props);

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
        onPress={this.props.clickEvent}
        title='Log In With Lyft' />
    );
  }
}
