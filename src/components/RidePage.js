import React, { Component } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import { encode as btoa, decode as atob } from 'base-64';
import { WebBrowser, SecureStore } from 'expo';
import { lyft_client_id, lyft_client_secret } from '../../config.js';
import ApiService from '../services/ApiService';
import MagicCarpetButton from './MagicCarpetButton';
import LyftService from '../services/LyftService';
import HomeButton from './HomeButton';
import CancelButton from './CancelButton';
import DestinationButton from './DestinationButton';

export default class RidePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rideCancelled: false,
      desinationVisible: false,
      goHome: false,
      pickedUp: false,
      rideStatus: 'Your',
      cancel_cost: null
    }

    this.rideStatus()

    this.cancelRide = this.cancelRide.bind(this)
    this.revealDestination = this.revealDestination.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
  };

  rideStatus() {
    LyftService.getStatus(this.props.rideId)
    .then(
      (response) => {
        response.json()
      }
    )
    .then(
      (parsedResponse) => {

      if (parsedResponse['status'] === 'pending') {
        var timer = setInterval(()=> this.rideStatus(), 15000);
      } else if (parsedResponse['status'] === 'accepted') {
        clearInterval(timer);
        var minutes = Math.floor(parsedResponse['origin']['eta_seconds'] / 60);
        if (minutes >= 3) {
          var timer = setInterval(()=> this.rideStatus(), 30000);
        } else {
          var timer = setInterval(()=> this.rideStatus(), 15000);
        };
        this.setState(() => ({
          rideStatus: `${parsedResponse['driver']['first_name']} is on the way and is approximately ${minutes} minutes away.  Look out for a ${parsedResponse['vehicle']['color']} ${parsedResponse['vehicle']['make']} with license plate number ${parsedResponse['vehicle']['license_plate']}!`
        }));
      } else if (parsedResponse['status'] === 'arrived') {
        clearInterval(timer);
        var timer = setInterval(()=> this.rideStatus(), 30000);
        this.setState(() => ({
          rideStatus: `${parsedResponse['driver']['first_name']} has arrived.  Find a ${parsedResponse['vehicle']['color']} ${parsedResponse['vehicle']['make']} with license plate number ${parsedResponse['vehicle']['license_plate']}!`
        }));
      } else if (parsedResponse['status'] === 'pickedUp') {
        clearInterval(timer);
        this.setState(() => ({
          pickedUp: true
        }));
      }
    })
  }

  cancelRide() {
    ApiService.cancelRide(this.props.rideId)
    .then(
      (response)=>{
        if (response.error) {
          this._reallyCancel(`${response.amount / 100}.00`)
        } else {
          this.setState(() => ({
            rideCancelled: true,
            cancel_cost: response.amount
          }));
        }
      })
    
  }

   cancelIt() {
    ApiService.confirmCancelRide(this.props.rideId, this.state.cancel_cost)
    .then(()=>{
      debugger
      this.props.handleHomeClick()
    })
    .catch((error)=>console.log(error))
  }

  _reallyCancel(cancel_cost) {
    Alert.alert(
      'Cancel Your Ride?',
      `Cancelling your ride will cost $${cancel_cost} \n Do you still wish to cancel?`,
      [
        {text: 'Cancel', onPress: () => 
          console.log('Cancel Pressed'), style: 'cancel'
        },
        {text: 'OK', onPress: () =>{
          this.cancelIt()
        }},
      ],
      { cancelable: false }
    )
  }

  _cancelAlert = () => {
    Alert.alert(
      'Cancel Your Ride?',
      "Would you like to cancel your ride?",
      [
        {text: 'Cancel', onPress: () => 
          console.log('Cancel Pressed'), style: 'cancel'
        },
        {text: 'OK', onPress: () =>{
          this.cancelRide()
          // .then(()=>console.log('OK Pressed'))X
        }},
      ],
      { cancelable: false }
    )
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
    let content;
    if (this.state.goHome || this.state.rideCancelled) {
      content = <MagicCarpetButton />
    } else if (this.state.pickedUp) {
      content = <MagicCarpetButton />
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
        <TouchableOpacity>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card title='Ride Status' style={styles.header}>
            <Text style={styles.text}>{this.state.rideStatus}</Text>
          </Card> 
          <DestinationButton revealDestination={this.revealDestination} />
          <CancelButton cancelRide={this._cancelAlert} />
        </TouchableOpacity>
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
    fontSize: 20,
  },
  buttons: {
   justifyContent: 'space-between',
   flexDirection: 'row',
   margin: 20,
   marginBottom: 30,
 },
});
