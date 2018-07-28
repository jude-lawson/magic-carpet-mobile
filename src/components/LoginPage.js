import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { encode as btoa, decode as atob } from 'base-64';
import { WebBrowser, SecureStore } from 'expo';
import { lyft_client_id, lyft_client_secret } from '../../config.js';

import LyftLoginButton from './LyftLoginButton';
import LandingPage from './LandingPage'
import LyftService from '../services/LyftService'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      result: null
    }

    this.handleCallback = this.handleCallback.bind(this)
  };

  openURL = async (url) => {
    Linking.addEventListener( 'url', this.handleCallback );
    let result = await WebBrowser.openBrowserAsync(url)
    // let result = await AuthSession.startAsync({
    //   authUrl: url
    // });
    // this.setState({ result });
  };

  componentDidMount() {
    console.log('Component is mounted')
  }

  handleCallback(event) {
    console.log('In callback handler')
    const auth_code = event.url.split('?')[1].split('&')[0].split('=')[1]
    const enc_client_auth = btoa(`${lyft_client_id}:${lyft_client_secret}`)

    LyftService.authorize(auth_code, enc_client_auth)
    .then((response) => response.json())
    .then((parsedResponse) => {
      if (auth_code === 'access_denied') {
        return
      } else {
        this.setState(() => ({
          loggedIn: false
        }));
        SecureStore.setItemAsync('lyftToken', parsedResponse['access_token']);
        SecureStore.getItemAsync('lyftToken').then(response => console.log(response));
        SecureStore.setItemAsync('lyftRefreshToken', parsedResponse['refresh_token']);
        SecureStore.getItemAsync('lyftRefreshToken').then(response => console.log(response));
        WebBrowser.dismissBrowser();
      }
    })
  }

  render() {
    let page;
    if (this.state.loggedIn) {
      page = <LandingPage />
    } else {
      page = <LyftLoginButton clickEvent={() => this.openURL(`https://www.lyft.com/oauth/authorize_app?client_id=${lyft_client_id}&scope=public%20profile%20rides.read%20rides.request%20offline&state=%3Cstate_string%3E&response_type=code`)}/>
    }

    return (
      <React.Fragment>
        {page}
      </React.Fragment>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
   justifyContent: 'space-between',
   flexDirection: 'row',
   margin: 20,
   marginBottom: 30,
 },
});
