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
    this.goGetAdventure = this.goGetAdventure.bind(this)
  }

  // setSettings(settings){
  //   this.setState(
  //     ()=>({settings: settings,
  //           openSettings:false})
  //   )
  // }
  _getLocationAsync = async () => {
    if (Expo.Constants.isDevice) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    } else {
      this.setState(() => ({
        
          longitude: -104.984491000,
          latitude: 39.729353000

      }));
    }
  };

  async setRideSettings(){
    console.log("in set ride settings")
    console.log(this.state)
    return JSON.stringify({
      search_settings: {
        "open_now": true,
        "radius": this.state.settings.max_radius,
        "latitude": await this.state.latitude,
        "longitude": await this.state.longitude,
        "max_price": await this.state.settings.max_price,
        "min_price": await this.state.settings.min_price,
        "price": await this.state.settings.price,
        "term": "restaurants"
        },
      restrictions: {
        max_rating: this.state.settings.max_rating,
        min_rating: this.state.settings.min_rating,
        categories:[],
        min_radius: await this.state.settings.min_radius
      }
    })
    console.log(" ")

  }

  async goGetAdventure(){
    console.log("in go get adventure")
    let body = await this.setRideSettings()
    console.log(body)
    return fetch('http://localhost:3000/api/v1/adventures', {
        method: 'POST',
        body: body 
    })
  }

  async createAdventure() {
    this._getLocationAsync({})
    .then((location)=>{
      console.log(location)
      this.setState(()=>({
        location: location
      }))
    })
    .then(()=>{
      console.log(this.state)
      this.goGetAdventure()
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((parsedResponse) => {
        console.log('parsed response')
        console.log(parsedResponse)
        this.setState(() => ({
          rideCalled: true,
          content: parsedResponse.destination
        }))
      })
      .catch((error) => {
        console.error(error);
      })
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
      console.log(this.state)
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
