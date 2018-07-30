import React, { Component } from 'react'
import { Text } from 'react-native-elements'

// import LoginButton from './LoginButton'
import Login from './Login'

export default class Main extends Component {
  constructor() {
    super()
    
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return(
        <Login />
      )
    } else if (this.state.isLoggedIn) {
      return <Text>Not the LoginButton</Text>
    }
  }
}
