import React, { Component } from 'react'

import HomeButton from './HomeButton'
import SettingsButton from './SettingsButton'
import Settings from './Settings'
import MagicCarpetButton from './MagicCarpetButton'
import ErrorMessage from './ErrorMessage'
import { default_origin_latitude, default_origin_longitude } from '../../config'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      intialSettings: this.props.settings,
      settingsOpen: false,
      radius: [this.props.settings.min_radius, this.props.settings.max_radius],
      price: [this.props.settings.min_price, this.props.settings.max_price],
      rating: [this.props.settings.min_rating, this.props.settings.max_rating]
    }

    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.saveRadius = this.saveRadius.bind(this)
    this.savePrice = this.savePrice.bind(this)
    this.saveRating = this.saveRating.bind(this)
    this.createAdventure = this.createAdventure.bind(this)
  }

  handleHomeClick() {
    this.setState({ settingsOpen: false })
  }

  toggleSettings() {
    this.state.settingsOpen ? this.setState({ settingsOpen: false }) : this.setState({ settingsOpen: true })
  }

  saveRadius(data) {
    this.setState({ radius: [data[0], data[1]] })
  }

  savePrice(data) {
    this.setState({ price: [data[0], data[1]] })
  }
  
  saveRating(data) {
    this.setState({ rating: [data[0], data[1]] })
  }

  async getLocation() {
    if (Expo.Constants.isDevice) {
      let { status } = await PermissionRequest.askAsync(Permissions.LOCATION)
      if (status !== 'granted') {
        this.setState({ error: 'Permission to access location was denied' })
      }
      
      return await Location.getCurrentPositionAsync({})
    } else {
      return ({
        latitude: default_origin_latitude,
        longitude: default_origin_longitude
      })
    }
  }

  createAdventure() {
    console.log('Creating adventure!')
    // Get the location
    // ?? Set Location in state ??
    // 
    console.log('Adventure is created!')
  }

  render() {
    let content;

    if (this.state.settingsOpen) {
      content = (
        <Settings 
          settings={this.state.initialSettings}
          handleSaveRadius={this.saveRadius} 
          handleSavePrice={this.savePrice} 
          handleSaveRating={this.saveRating}  
          currentRadius={this.state.radius} 
          currentPrice={this.state.price} 
          currentRating={this.state.rating} 
          handleSaveClick={this.toggleSettings} />
      )
    } else if (!this.state.settingsOpen) {
      content = <MagicCarpetButton handleClick={this.createAdventure}/>
    } else if (!this.state.settingsOpen && this.state.error) {
      content = (
        <React.Fragment>
          <ErrorMessage message={this.state.error} />
          <MagicCarpetButton handleClick={this.createAdventure} />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <HomeButton handleClick={this.handleHomeClick} />
        <SettingsButton handleClick={this.toggleSettings} />
        {content}
      </React.Fragment>
    );
  }
}
