import React, { Component } from 'react';
import { StyleSheet, View, Linking , AsyncStorage } from 'react-native';
import SafariView from 'react-native-safari-view';
import SInfo from 'react-native-sensitive-info'
import { lyft_client_id, lyft_client_secret } from '../../config.js';

import LyftLoginButton from './LyftLoginButton';
import LandingPage from './LandingPage'
import LyftService from '../services/LyftService'

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }

    this.handleCallback = this.handleCallback.bind(this)
  };

  openURL = (url) => {
    SafariView.show({
      url: url,
      fromBottom: true,
    })
  };

  componentDidMount() {
    Linking.addEventListener( 'url', this.handleCallback );
  }

  handleCallback(event) {
    const auth_code = event.url.split('?')[1].split('&')[0].split('=')[1]
    const enc_client_auth = btoa(`${lyft_client_id}:${lyft_client_secret}`)

    LyftService.authorize(auth_code, enc_client_auth)
    .then((response) => response.json())
    .then((parsedResponse) => {
      if (auth_code === 'access_denied') {
        return
      } else {
        this.setState(() => ({
          loggedIn: true
        }));
        SInfo.setItem('lyftToken', parsedResponse['access_token'], {});
        SInfo.setItem('lyftRefreshToken', parsedResponse['refresh_token'], {});
      }
      SafariView.dismiss();
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
