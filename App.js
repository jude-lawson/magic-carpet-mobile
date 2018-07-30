import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Location, Permissions } from 'expo';

// import LoginPage from './src/components/LoginPage'
import LandingPage from './src/components/LandingPage'
import Gradient from './src/components/Gradient'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      latitude: null,
      longitude: null
    }
    // this.getLocation = this.getLocation.bind(this)
  }

  componentWillMount() {
    this.getLocation().then(() => {
      console.log(this.state.latitude)
      console.log(this.state.longitude)
    })
  }

  async getLocation() {
    /* This is how we get permission for location and get current location */

    // let { status } = await Permissions.askAsync(Permissions.LOCATION)
    // let true_status = await Permissions.getAsync(Permissions.LOCATION)
    // console.log(true_status)

    // if(status === 'granted') {
    //   console.log('Granted')
    //   let location = await Location.getCurrentPositionAsync({})
    //   console.log(location)
    // } else {
    //   console.log('Permission to use device location must be granted to use this app.')
    //   return
    // }

     /* The simulator was being weird, so I'm leaving this commented out for now */

    this.setState({
      latitude: "39.987344",
      longitude: "-105.083387" 
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Gradient />
        <LandingPage 
          location={{ latitude: this.state.latitude, longitude: this.state.longitude }}
          settings={{ radius: [2,4], price: [2,3], rating: [2,4] }} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030622'
  }
});
