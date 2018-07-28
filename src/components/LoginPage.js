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
      loggedIn: false,
      result: null
    }

    this.handleCallback = this.handleCallback.bind(this)
  };

  openURL = async (url) => {

    console.log("Open Url (2)")
    console.log(Expo.Constants.linkingUri)
    console.log(" ")

    Linking.addEventListener( 'url', this.handleCallback );
    WebBrowser.openBrowserAsync(url)
    .then((result)=> {
      console.log("Open BrowsersResult (3)")
      console.log(result)
      console.log(" ")
      return result
    })
    .catch((error)=>console.log(error))

    // let result = await AuthSession.startAsync({
    //   authUrl: url
    // });
    // this.setState({ result });
  };

  componentDidMount() {
    console.log('Component is mounted')
    console.log(" ")
  }

  async setTokensKeychain(token, refresh_token) {
    await SecureStore.setItemAsync('lyftToken', token)
    await SecureStore.setItemAsync('lyftRefreshToken', refresh_token)
  }

  setUserId(response){

    return response._textBody
    if (response["user_id"]){
      SecureStore.setItemAsync('id', response["id"])
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
    console.log('handling callback (4)')
    console.log(" ")
    const auth_code = event.url.split('?')[1].split('&')[0].split('=')[1]
    const enc_client_auth = btoa(`${lyft_client_id}:${lyft_client_secret}`)

    LyftService.authorize(auth_code, enc_client_auth)
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log('parsed lyft response (5)')
      console.log(parsedResponse)
      console.log(" ")

      if (auth_code === 'access_denied') {
        return
      } else {
        console.log('keycahin tokens settting(5.5)')
        console.log(parsedResponse['access_token'])
        console.log(parsedResponse['refresh_token'])

        this.setTokensKeychain(parsedResponse['access_token'], parsedResponse['refresh_token'])
        .then(()=>{
          console.log('keycahin tokens set(6)')
          console.log(" ")
          return ApiService.createUser()
        })
        .then((response)=>{
          console.log('USER CREATED (7)')
          console.log(response)
          console.log(" ")

          this.setUserId(response)
          
        })
        .then(()=>{
            this.setState(() => ({
              loggedIn: true
            }))
            console.log('state set to logged in (8)')
            console.log(" ")
        })
        .catch(
          (error)=>{console.log(error)
        })
        .then(()=>{
          console.log('browser dismissed (9)')
          console.log(" ")
          WebBrowser.dismissBrowser();
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
