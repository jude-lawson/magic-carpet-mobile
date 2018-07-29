import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { encode as btoa, decode as atob } from 'base-64';
import { WebBrowser, SecureStore } from 'expo';
import { lyft_client_id, lyft_client_secret } from '../../config.js';

import CancelButton from './CancelButton';
import LandingPage from './LandingPage'
import LyftService from '../services/LyftService'

export default class RidePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rideCancelled: false,
      desinationVisible: false,
      goHome: false,
      pickedUp: false,
      rideStatus: null
    }

    this.cancelRide = this.cancelRide.bind(this)
    this.revealDestination = this.revealDestination.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
  };

  componentDidMount() {
    setTimer(1500)
  }

  setTimer(interval) {
    var timer = setInterval(()=> this.rideStatus(), interval)
  }

  rideStatus() {
    LyftService.get_status()
    .then((response) => response.json())
    .then((parsedResponse) => {
      if (parsedResponse['status'] === 'pending') {
        this.setState(() => ({
          rideStatus: 'Magic Carpet is locating your ride!'
        }));
      } else if (parsedResponse['status'] === 'accepted') {
        clearInterval(timer);
        var minutes = Math.floor(parsedResponse['origin']['eta_seconds'] / 60);
        if (minutes >= 3) {
          setTimer(30000)
        } else {
          setTimer(15000)
        };
        this.setState(() => ({
          rideStatus: `${parsedResponse['driver']['first_name']} is on the way and is approximately ${minutes} minutes away.  Look out for a ${parsedResponse['vehicle']['color']} ${parsedResponse['vehicle']['make']} with license plate number ${parsedResponse['vehicle']['license_plate']}!`
        }));
      } else if (parsedResponse['status'] === 'arrived') {
        clearInterval(timer);
        setTimer(30000);
        this.setState(() => ({
          rideStatus: `${parsedResponse['driver']['first_name']} has arrived.  Find a ${parsedResponse['vehicle']['color']} ${parsedResponse['vehicle']['make']} with license plate number ${parsedResponse['vehicle']['license_plate']}!`
        }));
      } else if (parsedResponse['status'] === 'pickedUp') {
        clearInterval(timer);
        this.setState(() => ({
          pickedUp: true
        }));
      }
    }
  }

  cancelRide() {
    this.setState(() => ({
      rideCancelled: true
    }));
  }

  revealDestination() {
    this.setState(() => ({
      destinationVisible: true
    }));
  }

  handleHomeClick() {
    this.setState(() => ({
      goHome: true
    }));
  }

  render() {
    if (this.state.goHome || this.state.rideCancelled) {
      content = <LandingPage />
    } else if (this.state.pickedUp) {
      content = <ReviewsPage />
    } else if (this.state.destinationVisible) {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
            title='This is your destination'>
            <Text>Name: {this.props.data.name}</Text>
            <Text>Address: {this.props.data.street_address}</Text>
            <Text>City: {this.props.data.city}</Text>
            <Text>Rating: {this.props.data.rating}</Text>
          </Card>
        </React.Fragment>
      )
    } else {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
            title='Ride Status' >
            <Text>{this.state.rideStatus}</Text>
          </Card>
          <Button
            raised
            large
            buttonStyle={{
              borderRadius: 50,
              marginTop: 20,
              backgroundColor: '#4fb859'
            }}
            title='Reveal Your Destination'
            onPress={this.revealDestination()} />
          <Button
            raised
            large
            buttonStyle={{
              borderRadius: 50,
              marginTop: 20,
              backgroundColor: '#4fb859'
            }}
            title='Cancel Ride'
            onPress={this.cancelRide()} />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
   justifyContent: 'space-between',
   flexDirection: 'row',
   margin: 20,
   marginBottom: 30,
 },
});
