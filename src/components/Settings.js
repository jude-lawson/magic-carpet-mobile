import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-elements'

import SettingsSlider from './SettingsSlider'
import SettingsSaveButton from './SettingsSaveButton'

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Card wrapperStyle={{ width: 300 }} >
        <Text style={styles.settingsHeading}>Settings</Text>
  
        <SettingsSlider 
          name="Radius"
          min={this.props.currentRadius[0]} 
          max={this.props.currentRadius[1]} 
          additional="Meters" 
          values={[this.props.currentRadius[0], this.props.currentRadius[1]]}
          onValuesChange={this.props.handleSaveRadius}
          onValuesChangeFinish={this.props.handleSaveRadius}
          maximum={7000}
          minimum={500} />

          <SettingsSlider 
          name="Price"
          min={'$'.repeat(this.props.currentPrice[0])} 
          max={'$'.repeat(this.props.currentPrice[1])} 
          values={[this.props.currentPrice[0], this.props.currentPrice[1]]}
          onValuesChange={this.props.handleSavePrice}
          onValuesChangeFinish={this.props.handleSavePrice}
          maximum={4}
          minimum={1} />

          <SettingsSlider 
          name="Rating"
          min={this.props.currentRating[0]} 
          max={this.props.currentRating[1]} 
          values={[this.props.currentRating[0], this.props.currentRating[1]]}
          onValuesChange={this.props.handleSaveRating}
          onValuesChangeFinish={this.props.handleSaveRating}
          maximum={4}
          minimum={1} />

          <SettingsSaveButton handleClick={this.props.handleSaveClick}/>

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
