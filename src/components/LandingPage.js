import React, { Component } from 'react';
import { Text } from 'react-native';
import { WebBrowser } from 'expo';

import SettingsIcon from './SettingsIcon';
import MagicCarpetButton from './MagicCarpetButton';
import EstimatePage from './EstimatePage';
import HomeButton from './HomeButton';
import SettingsPage from './SettingsPage';
import UserAvatar from './UserAvatar';
import { lyft_client_id } from '../../config.js'

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'This is the current body',
      loggedIn: true,
      rideCalled: false,
      openSettings: false
    }

    this.createAdventure = this.createAdventure.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.renderSettingsPage = this.renderSettingsPage.bind(this)
    this.openLyft = this.openLyft.bind(this)
  }

  createAdventure() {
    // fetch('http://localhost:3000/api/v1/adventures', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     preferences: {
    //     "open_now": true,
    //     "radius": 1000,
    //     "latitude": 39.7293,
    //     "longitude": -104.9844,
    //     "price": "1,2,3",
    //     "term": "restaurants"
    //     }
    //   })
    // })
    //  .then((response) => response.json())
    //  .then((parsedResponse) => {
    //    this.setState(() => ({
    //      rideCalled: true,
    //      content: parsedResponse.destination
    //    }))
    //  })
    //  .catch((error) => {
    //    console.error(error);
    //  })
    return
  }

  openLyft() {
    WebBrowser.openBrowserAsync(`https://lyft.com/ride?id=lyft&pickup[latitude]=39.9721648&pickup[longitude]=-105.08742&partner=${lyft_client_id}&destination[latitude]=39.9877087&destination[longitude]=-105.0858611`)
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
    // if (!this.state.rideCalled && !this.state.openSettings) {
    //   pageContent = (
    //     <React.Fragment>
    //       {/* <HomeButton handleHomeClick={this.handleHomeClick} />
    //       <UserAvatar />
    //       <SettingsIcon renderSettings={this.renderSettingsPage} />
    //       <MagicCarpetButton clickEvent={this.createAdventure} /> */}
    //       <Text>Nope.</Text>
    //     </React.Fragment>
    //   );
    // } else 
    if (this.state.rideCalled) {
      pageContent = <EstimatePage price={this.state.content.price} data={this.state.content} />
    } else if (this.state.openSettings) {
      pageContent = <SettingsPage />
    } else if (this.state.loggedIn) {
      pageContent = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <UserAvatar />
          <SettingsIcon renderSettings={this.renderSettingsPage} />
          <MagicCarpetButton clickEvent={this.openLyft} />
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
