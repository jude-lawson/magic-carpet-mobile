import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-elements'

import SettingsSlider from './SettingsSlider'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: {
        radius: [props.settings.min_radius, props.settings.max_radius],
      }
    }

    this.saveRadius = this.saveRadius.bind(this)
  }

  saveRadius(data) {
    this.setState({
      settings: {
        radius: [data[0], data[1]]
      }
    })
  }

  render() {
    return(
      <Card wrapperStyle={{ width: 300 }} >
        <Text style={styles.settingsHeading}>Settings</Text>
  
        <SettingsSlider 
          name="Radius"
          min={this.state.settings.radius[0]} 
          max={this.state.settings.radius[1]} 
          additional="Meters" 
          values={this.state.settings.radius}
          onValuesChange={this.saveRadius}
          onValuesChangeFinish={this.saveRadius}
          maximum={7000}
          minimum={500} />

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  settingsHeading: {
    fontSize: 28,
    textAlign: 'center'
  }
})
