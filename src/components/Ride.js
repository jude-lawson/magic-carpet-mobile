import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text, Card } from 'react-native-elements'
import { SecureStore } from 'expo'

import ApiService from '../services/ApiService';
import CancelButton from './CancelButton'
import Estimate from './Estimate'
import RidePage from './RidePage'


export default class Ride extends Component {
  constructor(props) {
    super(props)

    this.state = {
      estimateOpen: true,
      rideId: null

      // estimateOpen: false,
      // rideId: 123
    }
    this.handleYesClick = this.handleYesClick.bind(this)
    this.cancelRide = this.cancelRide.bind(this)
    this.throwCancelConfirmation = this.throwCancelConfirmation.bind(this)
  }

  async handleYesClick() {
    // let origin = this.props.origin
    // let destination = {
    //   latitude: this.props.adventure.destination.latitude,
    //   longitude: this.props.adventure.destination.longitude
    // }
    // let cost_token = this.props.adventure.price_range.cost_token
    // let ride = await ApiService.createRide({ origin: origin, destination: destination, cost_token: cost_token })

    var access_token = await SecureStore.getItemAsync('access_token')
    var post_body = JSON.stringify({
      ride_type: 'lyft',
      origin: {
        lat: 39.7513723,
        lng: -104.9965242
      },
      destination: {
        lat: 39.7516527,
        lng: -105.0016258
      }
    })
    // let response = await fetch('http://localhost:3000/api/v1/rides', { method: 'POST' })
    // let parsedResponse = await response.json()
    let response = await fetch('https://api.lyft.com/v1/rides', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: post_body
    })

    let parsedResponse = await response.json()

    console.log(parsedResponse)

    if (parsedResponse.error === 'primetime_confirmation_required') {
      Alert.alert(
        'Prime Time Confirmation Required',
        "There is an additional primetime cost for this ride from Lyft. Would you like to accept this additional cost?",
        [
          {text: 'Cancel', onPress: () => { 
            this.throwCancelConfirmation() 
          }, style: 'cancel'
          },
          {text: 'OK', onPress: () =>{
            fetch('https://api.lyft.com/v1/rides', {
              method: 'POST',
              headers: {
                'Authorization': `bearer ${access_token}`,
                'Content-Type': 'application/json'
              },
              body: post_body
            }).then(response => response.json())
              .then(parsedResponse => {
                console.log(parsedResponse)
                this.setState({ estimateOpen: false, rideId: parsedResponse.ride_id })
              })
          }},
        ],
        { cancelable: false }
      )
    } else {
      console.log("Ride called")
      this.setState({ estimateOpen: false, rideId: parsedResponse.ride_id })
    }
  }

  throwCancelConfirmation() {
    Alert.alert(
      'Cancel Your Ride?',
      "Would you like to cancel your ride?",
      [
        {text: 'Cancel', onPress: () => 
          console.log('Cancel Pressed'), style: 'cancel'
        },
        {text: 'OK', onPress: () =>{
          this.cancelRide()
        }},
      ],
      { cancelable: false }
    )
  }

  async cancelRide() {
    console.log('Cancelling ride...')
    var access_token = await SecureStore.getItemAsync('access_token')
    console.log(access_token);
    console.log(this.state.rideId)

    let response = await fetch(`https://api.lyft.com/v1/rides/${this.state.rideId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    })

    // let response = await fetch('http://localhost:3000/api/v1/rides') // This was the mock if we need it
    let responseBody = await response.json()


    if (response.status == 204) {
      console.log('Ride succesfully cancelled')
    } else if (response.status == 400) {
      Alert.alert(
        'Cancel Your Ride?',
        `Cancelling your ride will cost $${responseBody.amount / 100}.00 \n Do you still wish to cancel?`,
        [
          {text: 'Cancel', onPress: () => 
            console.log('Cancel Pressed'), style: 'cancel'
          },
          {text: 'OK', onPress: () =>{
            console.log('Cancelling...')
            console.log(this.state.rideId)
            console.log(access_token)
            fetch(`https://api.lyft.com/v1/rides/${this.state.rideId}/cancel`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
              }
            })
          }},
        ],
        { cancelable: false }
      )
    }
  }

	render() {
    let adventure = this.props.adventure
    let minimum_cost = `$${(adventure.price_range.min_cost / 100)}.00`
    let maximum_cost = `$${(adventure.price_range.max_cost / 100)}.00`

    let content;
    if (this.state.estimateOpen) {
      content = (
        <Estimate 
          minimum_cost={minimum_cost}
          maximum_cost={maximum_cost}
          handleYesClick={this.handleYesClick}
          handleNoClick={this.props.handleNoClick} />
      )
    } else if (false) {
      content = (
        <RidePage rideId={this.state.rideId}
                  handleHomeClick={this.props.handleNoClick}
                  adventure={this.props.adventure}/>
      )
    } else if (!this.state.estimateOpen && this.state.rideId) {
      content = (
        <React.Fragment>
          <Text>Your ride is on it's way!</Text>
          <TouchableOpacity>
            <Card title='Ride Status' style={styles.header}>
              <Text style={styles.text}>{this.state.rideStatus}</Text>
            </Card> 
            <CancelButton cancelRide={this.throwCancelConfirmation} />
          </TouchableOpacity>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )
  }
}

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
