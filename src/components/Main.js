import React, { Component } from 'react'
import { WebBrowser, Linking } from 'expo'
import { encode as btoa } from 'base-64'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Animation from 'lottie-react-native';

import { lyft_client_id, lyft_client_secret } from '../../config'
import LyftService from '../services/LyftService'
import ApiService from '../services/ApiService'
import bouncy from '../../assets/animations/bouncy.json';
import Home from './Home'
import Login from './Login'

export default class Main extends Component {
  constructor() {
    super()

    this.state = {
      isLoggedIn: false,
      settings: null

      // isLoggedIn: true,
      // settings: {
      //   max_price: 4,
      //   max_radius: 4000,
      //   max_rating: 5,
      //   min_price: 1,
      //   min_radius: 1000,
      //   min_rating: 0,
      // }
    }

    this.handleCallback = this.handleCallback.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleCallback);
    this.animation.play();
  }

  handleCallback(event) {
    const auth_code = event.url.split('?')[1].split('&')[0].split('=')[1]
    const enc_client_auth = btoa(`${lyft_client_id}:${lyft_client_secret}`)
    console.log(auth_code)
    console.log(enc_client_auth)
    LyftService.isAuthorized(auth_code, enc_client_auth)
      .then((access) => {
        if (access) {
          ApiService.createUser().then((settings_from_server) => {
            console.log(settings_from_server)
            this.setState({ isLoggedIn: true, settings: settings_from_server.settings })
          })
        }

        WebBrowser.dismissBrowser()
      });
  }

  render() {
    if (!this.state.isLoggedIn) {
      return(
        <View style={styles.view}>
          <Text style={styles.banner}>Magic Carpet</Text>
          <Text style={styles.text}>Forget it and Fly</Text>
          <Animation
            ref={animation => {
            this.animation = animation;
            }}
            style={styles.animations}
            source={bouncy}
            resizeMode="cover"
          />
          <Login />
        </View>
      )
    } else if (this.state.isLoggedIn) {
      return (
        <Home settings={this.state.settings} />
      )
    }
  }
}

// const styles = StyleSheet.create ({
//   view:{
//     flex: 1,
//     justifyContent:"center",
//     alignItems:'center'
//   },
//   banner: {
//     textAlign: 'center',
//     color: 'black',
//     margin: 5,
//     fontSize: 40,
//   },
//   animations:{
//     height: 300,
//     width: 300,
//     marginBottom: 200

//   },
//   text: {
//     textAlign: 'center',
//     color: 'black',
//     marginBottom: 15,
//     fontSize: 20,
//   }
// });

const styles = StyleSheet.create ({
  view:{
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  banner: {
    textAlign: 'center',
    color: 'black',
    margin: 5,
    fontSize: 40,
  },
  animations:{
    height: 380,
    width: 200,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 45,
    fontSize: 20,
  }
});
