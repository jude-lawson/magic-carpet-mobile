import React, { Component } from 'react';
import { Text, Card } from 'react-native';
import { WebBrowser } from 'expo';

import SettingsIcon from './SettingsIcon';
import MagicCarpetButton from './MagicCarpetButton';
import EstimatePage from './EstimatePage';
import HomeButton from './HomeButton';
import SettingsPage from './SettingsPage';
import ApiService from './ApiService';
import { lyft_client_id } from '../../config.js'

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      rideCalled: false,
      openSettings: false,
      content: 'Default'
    }

    this.createAdventure = this.createAdventure.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.renderSettingsPage = this.renderSettingsPage.bind(this)
    this.openLyft = this.openLyft.bind(this)
  }

  createAdventure() {
    fetch('http://localhost:3000/api/v1/adventures', {
      method: 'POST',
      body: JSON.stringify({
        preferences: {
          search_settings: {
            "open_now": true,
            "radius": 1000,
            "latitude": 39.7293,
            "longitude": -104.9844,
            "price": "1,2,3",
            "term": "restaurants"
          },
          restrictions: {
            categories: [],
            min_radius: 1000
          }
        }
      })
    }).then((response) => response.json())
      .then((parsedResponse) => {
        this.setState(() => ({
          content: parsedResponse.destination
        }))
      })
      .catch((error) => {
        console.error(error);
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
 
    if (this.state.rideCalled) {
      pageContent = <EstimatePage price={this.state.content.price} data={this.state.content} />
    } else if (this.state.openSettings) {
      pageContent = <SettingsPage />
    } else if (this.state.loggedIn) {
      pageContent = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <SettingsIcon renderSettings={this.renderSettingsPage} />
          <MagicCarpetButton clickEvent={this.createAdventure} />
          {console.log(this.state.content)}
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
