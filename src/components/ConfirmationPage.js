import React, { Component } from 'react';
import { Text, Button } from 'react-native-elements';
import { WebBrowser } from 'expo';

import { lyft_client_id } from '../../config.js'

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
    let destination_latitude = this.state.destination.latitude
    let destination_longitude = this.state.destination.longitude
    let origin_latitude = this.state.origin.latitude
    let origin_longitude = this.state.origin.longitude
    console.log(`Destination latitude: ${destination_latitude}`)
    console.log(`Destination longitude: ${destination_longitude}`)
    console.log(`Origin latitude: ${origin_latitude}`)
    console.log(`Origin longitude: ${origin_longitude}`)
    console.log('Opening Lyft...')
    WebBrowser.openBrowserAsync(`https://lyft.com/ride?id=lyft&pickup[latitude]=${origin_latitude}&pickup[longitude]=${origin_longitude}&partner=${lyft_client_id}&destination[latitude]=${destination_latitude}&destination[longitude]=${destination_longitude}`)
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
