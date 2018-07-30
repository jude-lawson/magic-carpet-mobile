import React, { Component } from 'react';
import { Text, Button } from 'react-native-elements';
import { WebBrowser } from 'expo';

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
    // WebBrowser.openBrowserAsync(`https://lyft.com/ride?id=lyft&pickup[latitude]=39.9721648&pickup[longitude]=-105.08742&partner=${lyft_client_id}&destination[latitude]=39.9877087&destination[longitude]=-105.0858611`)
    console.log(`Destination latitude: ${this.state.destination.latitude}`)
    console.log(`Destination longitude: ${this.state.destination.longitude}`)
    console.log(`Origin latitude: ${this.state.origin.latitude}`)
    console.log(`Origin longitude: ${this.state.origin.longitude}`)
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
