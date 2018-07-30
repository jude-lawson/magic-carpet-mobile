import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import SettingsIcon from './SettingsIcon';
import MagicCarpetButton from './MagicCarpetButton';
import EstimatePage from './EstimatePage';
import HomeButton from './HomeButton';
import SettingsPage from './SettingsPage';
import UserAvatar from './UserAvatar';
import {Location, Permissions} from 'expo';


export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'This is the current body',
      rideCalled: false,
      openSettings: false,
      settings: this.props.settings
    }
    console.log(' ')
    console.log("landing page props")
    console.log(this.props)
    console.log(' ')
    this.saveSettings = this.saveSettings.bind(this)
    this.createAdventure = this.createAdventure.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.renderSettingsPage = this.renderSettingsPage.bind(this)
  }

  // setSettings(settings){
  //   this.setState(
  //     ()=>({settings: settings,
  //           openSettings:false})
  //   )
  // }
  _getLocationAsync = async () => {
    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // if (status !== 'granted') {
    //   this.setState({
    //     errorMessage: 'Permission to access location was denied',
    //   });
    // }

    // let location = await Location.getCurrentPositionAsync({});
    // this.setState({ location });
    return {latitude: 39.7293530 , longitude: -104.9844910}
  };

  createAdventure() {
    console.log(this.state.max_radius)
    this._getLocationAsync({})
    .then((location)=>{
      console.log(location)
      this.setState(()=>({
        location: location
      }))
    })
    .then(()=>{
      fetch('http://localhost:3000/api/v1/adventures', {
        method: 'POST',
        body: JSON.stringify({
          search_settings: {
            "open_now": true,
            "radius": this.state.max_radius,
            "latitude": this.state.location.latitude,
            "longitude": this.state.location.longitude,
            "max_price": this.state.max_price,
            "min_price": this.state.min_price,
            "price": "1,2,3",
            "term": "restaurants"
            },
          restrictions: {
            categories:[],
            min_radius: this.state.min_radius
          }
        })
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

  saveSettings(settings){
    console.log(settings)
    this.setState(()=>({
      settings: settings,
      openSettings: false
    }))
    console.log('after setting the new settings')
    console.log(this.state)
    console.log(this.props)
    console.log(' ')
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
      pageContent = <SettingsPage settings={this.state.settings} saveSettings={this.saveSettings}/>
    }

    return (
      <React.Fragment>
        {pageContent}
      </React.Fragment>
    );
  }
}
