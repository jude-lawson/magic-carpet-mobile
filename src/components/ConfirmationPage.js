import React, { Component } from 'react';
import { Text, Button } from 'react-native-elements';

export default class ConfirmationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      destination: this.props.destination,
      origin: this.props.origin
    }

    this.openRideService = this.openRideService.bind(this)
  }

  openRideService() {
    console.log('Opening Lyft...')
  }

  render() {
    console.log(this.props.destination)
    let distance_in_miles = Math.ceil(((this.props.destination.distance / 1000) * 0.62137))
    console.log(String(distance_in_miles))
    return (
      <React.Fragment>
        <Text>Your location has been chosen!</Text>
        <Text>It is about {distance_in_miles} miles away. Would you like to call a Lyft?</Text>
        <Button
          large
          icon={{
           name: 'ios-car',
           type: 'ionicon'}}
          buttonStyle={{
            backgroundColor: '#ab37b6',
            borderRadius: 50,
            width: 200
          }}
          onPress={this.openRideService}
          title='Get a Lyft' />
      </React.Fragment>
    );
  }
}
