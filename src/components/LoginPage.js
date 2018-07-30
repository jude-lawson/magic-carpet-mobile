import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { encode as btoa, decode as atob } from 'base-64';
import { WebBrowser, SecureStore } from 'expo';
import { lyft_client_id, lyft_client_secret } from '../../config.js';

import LyftLoginButton from './LyftLoginButton';
import LandingPage from './LandingPage'
import LyftService from '../services/LyftService'
import ApiService from './ApiService'


export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      result: null
    }

    this.handleCallback = this.handleCallback.bind(this)
    this.setUserId = this.setUserId.bind(this)
  };

  openURL = async (url) => {
    console.log("Open Url (2)")
    console.log(Expo.Constants.linkingUri)
    console.log(" ")

    Linking.addEventListener( 'url', this.handleCallback );
    WebBrowser.openBrowserAsync(url)
    .then((result)=> {
    })
  };
    // .catc((error)=>console.log(error))

    // let result = await AuthSession.startAsync({
    //   authUrl: url
    // });
    // this.setState({ result });

  componentDidMount() {
    console.log('Component is mounted')
    console.log(" ")
  }

  async setTokensKeychain(token, refresh_token) {
    await SecureStore.setItemAsync('lyft_token', token)
    await SecureStore.setItemAsync('lyft_refresh_token', refresh_token)
  }


  setUserId(received){
    let response = JSON.parse(received)
    if (response["id"]){
      let id = response.id.toString()
      SecureStore.setItemAsync('id', id)
      .then(
        ()=> {this.setState(() => ({
          loggedIn: true
        }))
      })
      .catch(
        (error)=>console.log(error)
      );
    } else {
      throw "error, server side"
    }
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

        this.setTokensKeychain(parsedResponse['access_token'], parsedResponse['refresh_token'])
        .then(()=>{

          ApiService.getInfo()
            .then((payload_data)=>{
            // let encoded_payload = ApiService.encodeJwt(payload_data)

            ApiService.createUser(payload_data)
            .then((response)=>{
              ApiService.decodeJwt(response.headers.map.authorization)
              .then((response)=>{
                console.log(response)
                this.setUserId(response)
              })
              .catch((error)=>console.log(error))
              })
          })
        })
        .then(()=>{
          WebBrowser.dismissBrowser();
          console.log('browser dismissed (9)')
          console.log(" ")
        })
        .catch(
          (error)=>{console.log(error)
        })
      }
    })
  }

  render() {
    let page;
    if (this.state.loggedIn) {
      page = <LandingPage />
    } else {
      console.log("Login Button (1)")
      console.log(" ")
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
