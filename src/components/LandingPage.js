import React, { Component } from 'react';
import { Text, Card } from 'react-native';
import { WebBrowser } from 'expo';

import SettingsIcon from './SettingsIcon';
import MagicCarpetButton from './MagicCarpetButton';
// import EstimatePage from './EstimatePage';
import HomeButton from './HomeButton';
import ConfirmationPage from './ConfirmationPage';
import SettingsPage from './SettingsPage';
import ApiService from './ApiService';
// import { lyft_client_id } from '../../config.js'

export default class LandingPage extends Component {
  constructor(props) {

    super(props);
    this.state = {
      loggedIn: true,
      rideCalled: false,
      openSettings: false,
      destination: { error: 'No destination chosen' },
      destinationChosen: false,
      settings: {
        radius: this.props.settings.radius,
        price: this.props.settings.price,
        rating: this.props.settings.rating,
      }
    }

    this.createAdventure = this.createAdventure.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.renderSettingsPage = this.renderSettingsPage.bind(this)
    this.openLyft = this.openLyft.bind(this)
    this.updateSettings = this.updateSettings.bind(this)
  }

  createAdventure() {
    let payload = JSON.stringify({
      preferences: {
        search_settings: {
          "open_now": true,
          "radius": Math.ceil((this.state.settings.radius[1] * 1000) / .6213712),
          "latitude": this.props.location.latitude,
          "longitude": this.props.location.longitude,
          "price": this.state.settings.price,
          "term": "restaurants"
        },
        restrictions: {
          categories: [],
          min_radius: 0
        }
      }
    });

    ApiService.goGet('adventures', 'post', { body: payload })
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log('Destination: ')
        console.log(parsedResponse.destination)
        this.setState({ destination: parsedResponse.destination, destinationChosen: true })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  updateSettings(new_settings) {
    console.log('Saving settings...')
    console.log(new_settings)
    this.setState({
      settings: {
        radius: new_settings.radius,
        price: new_settings.price,
        rating: new_settings.rating
      }
    })
  }

  openLyft() {
    // WebBrowser.openBrowserAsync(`https://lyft.com/ride?id=lyft&pickup[latitude]=39.9721648&pickup[longitude]=-105.08742&partner=${lyft_client_id}&destination[latitude]=39.9877087&destination[longitude]=-105.0858611`)
    console.log('Lyft is open')
  }

  handleHomeClick() {
    this.setState(() => ({
      rideCalled: false
    }));
  }

  renderSettingsPage() {
    this.setState(() => ({
      openSettings: true
    }));
  }

  render() {
    let pageContent;
 
    if (this.state.destinationChosen) {
      pageContent = <ConfirmationPage 
                      settings={this.state.settings}
                      destination={this.state.destination}
                      origin={this.props.location} />
    } else if (this.state.openSettings) {
      pageContent = <SettingsPage settings={this.state.settings} handleSave={(updatedSettings) => { this.updateSettings(updatedSettings) }} />
    } else if (this.state.loggedIn) {
      pageContent = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <SettingsIcon renderSettings={this.renderSettingsPage} />
          <MagicCarpetButton clickEvent={this.createAdventure} />
          {console.log(this.state.destination)}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {pageContent}
      </React.Fragment>
    );
  }
}
