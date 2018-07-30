import React, { Component } from 'react'
import { Text } from 'react-native-elements'

import MagicCarpetButton from './MagicCarpetButton'

export default class Main extends Component {
  render() {
    return(
      <React.Fragment>
        <Text>Welcome to Magic Carpet</Text>
        <Text>An All-In-One Adventure App</Text>
        <MagicCarpetButton />
      </React.Fragment>
    )
  }
}
