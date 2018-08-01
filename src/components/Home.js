import React, { Component } from 'react'

import HomeButton from './HomeButton'
import SettingsButton from './SettingsButton'
import Settings from './Settings'
import MagicCarpetButton from './MagicCarpetButton'
import ErrorMessage from './ErrorMessage'
import ApiService from '../services/ApiService';
import Ride from './Ride'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      intialSettings: this.props.settings,
      settingsOpen: false,
      homeOpen: true,
      radius: [this.props.settings.min_radius, this.props.settings.max_radius],
      price: [this.props.settings.min_price, this.props.settings.max_price],
      rating: [this.props.settings.min_rating, this.props.settings.max_rating],
      adventure: null
    }

    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.saveRadius = this.saveRadius.bind(this)
    this.savePrice = this.savePrice.bind(this)
    this.saveRating = this.saveRating.bind(this)
    this.handleMagicClick = this.handleMagicClick.bind(this)
  }

  handleHomeClick() {
    this.setState({ settingsOpen: false, homeOpen: true, adventure: null })
  }

  toggleSettings() {
    this.state.settingsOpen ? this.setState({ settingsOpen: false, homeOpen: true}) : this.setState({ settingsOpen: true, homeOpen: false })
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

  async handleMagicClick() {
    let createdAdventure = await ApiService.createAdventure(this.state)
    this.setState({ 
      adventure: createdAdventure.adventure,
      origin: createdAdventure.origin,
      homeOpen: false })
    
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
    } else if ((!this.state.settingsOpen && !this.state.adventure) || (this.state.homeOpen && !this.state.adventure))  {
      content = <MagicCarpetButton handleClick={this.handleMagicClick}/>
    } else if (!this.state.settingsOpen && this.state.error) {
      content = (
        <React.Fragment>
          <ErrorMessage message={this.state.error} />
          <MagicCarpetButton handleClick={this.handleMagicClick} />
        </React.Fragment>
      )
    } else if (!this.state.settingsOpen && this.state.adventure && !this.state.homeOpen) {
      content = <Ride adventure={this.state.adventure}
                      origin={this.state.origin}
                      handleNoClick={this.handleHomeClick} />
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
