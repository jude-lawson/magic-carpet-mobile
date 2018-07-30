import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import SettingsIcon from './SettingsIcon';
import MagicCarpetButton from './MagicCarpetButton';
import EstimatePage from './EstimatePage';
import HomeButton from './HomeButton';
import SettingsPage from './SettingsPage';
import UserAvatar from './UserAvatar';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'This is the current body',
      rideCalled: true,
      openSettings: false
    }

    this.createAdventure = this.createAdventure.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.renderSettingsPage = this.renderSettingsPage.bind(this)
  }

  createAdventure() {
    fetch('http://localhost:3000/api/v1/adventures', {
      method: 'POST',
      body: JSON.stringify({
        preferences: {
        "open_now": true,
        "radius": 1000,
        "latitude": 39.7293,
        "longitude": -104.9844,
        "price": "1,2,3",
        "term": "restaurants"
        }
      })
    })
     .then((response) => response.json())
     .then((parsedResponse) => {
       this.setState(() => ({
         rideCalled: true,
         content: parsedResponse.destination
       }))
     })
     .catch((error) => {
       console.error(error);
     })
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
    if (!this.state.rideCalled && !this.state.openSettings) {
      pageContent = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <UserAvatar />
          <SettingsIcon renderSettings={this.renderSettingsPage} />
          <MagicCarpetButton clickEvent={this.createAdventure} />
        </React.Fragment>
      );
    } else if (this.state.rideCalled) {
      pageContent = <EstimatePage price={this.state.content.price} data={this.state.content} />
    } else if (this.state.openSettings) {
      pageContent = <SettingsPage />
    }

    return (
      <React.Fragment>
        {pageContent}
      </React.Fragment>
    );
  }
}
