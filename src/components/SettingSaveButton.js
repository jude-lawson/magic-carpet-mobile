import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export class SettingSaveButton extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Button
        buttonStyle={{
          marginTop: 12
        }}
        backgroundColor='#7998fe'
        title='SAVE'
        onPress={this.props.clickEvent}
      />
    );
  }
}
