import React, { Component } from 'react'
import { Text } from 'react-native-elements'

import HomeButton from './HomeButton'
import SettingsButton from './SettingsButton'
import Settings from './Settings'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: this.props.settings,
      settingsOpen: false
    }

    this.handleHomeClick = this.handleHomeClick.bind(this)
    this.handleSettingsClick = this.handleSettingsClick.bind(this)
  }

  handleHomeClick() {
    this.setState({ settingsOpen: false })
  }

  handleSettingsClick() {
    this.setState({ settingsOpen: true })
  }

  render() {
    let content;

    if (this.state.settingsOpen) {
      content = <Settings />
    }

    return (
      <React.Fragment>
        <HomeButton handleClick={this.handleHomeClick} />
        <SettingsButton handleClick={this.handleSettingsClick} />
        {content}
      </React.Fragment>
    );
  }
}
