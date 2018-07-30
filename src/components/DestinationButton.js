import React, { Component } from 'react';
import { Button } from 'react-native-elements';


export default class DestinationButton extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Button
        raised
        large
        buttonStyle={{
          borderRadius: 50,
          marginTop: 20,
          backgroundColor: '#4fb859'
        }}
        title='Reveal Your Destination'
        onPress={this.props.revealDestination} />
    );
  }
}
