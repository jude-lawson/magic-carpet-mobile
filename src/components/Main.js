import React, { Component } from 'react'
import { Text } from 'react-native-elements'
import { WebBrowser, Linking } from 'expo'
import { encode as btoa, decode as atob } from 'base-64'

import { lyft_client_id, lyft_client_secret } from '../../config'
import LyftService from '../services/LyftService'
import ApiService from './ApiService'
import Home from './Home'
import Login from './Login'

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      // isLoggedIn: false,
      // settings: null

      // The settings below are only for skipping login
      isLoggedIn: true,
      settings: {
        id: 17,
        ride_count: 0,
        settings: {
          max_price: 4,
          max_radius: 4000,
          max_rating: 5,
          min_price: 1,
          min_radius: 1000,
          min_rating: 0,
        },
      }
    }

    this.handleCallback = this.handleCallback.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleCallback)
  }

  handleCallback(event) {
    const auth_code = event.url.split('?')[1].split('&')[0].split('=')[1]
    const enc_client_auth = btoa(`${lyft_client_id}:${lyft_client_secret}`)

    LyftService.isAuthorized(auth_code, enc_client_auth)
      .then((access) => {
        if (access) {
          ApiService.createUser().then((settings_from_server) => {
            console.log(settings_from_server)
            this.setState({ isLoggedIn: true, settings: settings_from_server })
          })
        }
        
        WebBrowser.dismissBrowser()
      });
  }

  render() {
    if (!this.state.isLoggedIn) {
      return(
        <Login />
      )
    } else if (this.state.isLoggedIn) {
      return (
        <Home settings={this.state.settings} />
      )
    }
  }
}
