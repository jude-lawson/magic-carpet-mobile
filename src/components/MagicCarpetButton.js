import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export default class MagicCarpetButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        raised
        large
        title='Magic Carpet'
        buttonStyle={{
          backgroundColor: '#ab37b6',
          borderRadius: 50,
          width: 200
        }}
        onPress={this.props.clickEvent} />
    );
  }
}
