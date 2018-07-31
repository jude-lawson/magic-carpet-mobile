import React, { Component } from 'react'

import HomeButton from './HomeButton'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: this.props.settings
    }
  }

  render() {

    return (
      <HomeButton />
      // Settings button
      // Magic Carpet Button
    );
  }
}
