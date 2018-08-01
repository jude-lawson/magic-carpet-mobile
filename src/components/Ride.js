import React, { Component } from 'react'
import { Text } from 'react-native-elements'

import ApiService from '../services/ApiService';
import Estimate from './Estimate'
import RidePage from './RidePage'


export default class Ride extends Component {
  constructor(props) {
    super(props)

    this.state = {
      estimateOpen: true,
      rideId: null
    }
    this.handleYesClick = this.handleYesClick.bind(this)
  }

  async handleYesClick() {
    let origin = this.props.origin
    let destination = {
      latitude: this.props.adventure.destination.latitude,
      longitude: this.props.adventure.destination.longitude
    }
    let cost_token = this.props.adventure.price_range.cost_token
    let ride = await ApiService.createRide({ origin: origin, destination: destination, cost_token: cost_token })
    console.log('Yes!')
    this.setState({ estimateOpen: false, rideId: ride.ride_id })
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
    } else if (!this.state.estimateOpen) {
      content = (
        <RidePage rideId={this.state.rideId}
                  handleHomeClick={this.props.handleNoClick}
                  adventure={this.props.adventure}/>
      )
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    )
  }
}