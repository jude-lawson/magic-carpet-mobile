import React, { Component } from 'react'

import { Text } from 'react-native-elements'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: this.props.settings
    }
  }

  render() {
    return (
      <Text>This is the Home Page</Text>
    );
  }
}
