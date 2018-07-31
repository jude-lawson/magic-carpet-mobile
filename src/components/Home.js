import React, { Component } from 'react'
import { Text } from 'react-native-elements'

import HomeButton from './HomeButton'
import SettingsButton from './SettingsButton'
import Settings from './Settings'

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
