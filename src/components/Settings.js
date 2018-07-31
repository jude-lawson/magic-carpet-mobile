import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-elements'

import SettingsSlider from './SettingsSlider'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      radius: [props.settings.min_radius, props.settings.max_radius],
      price: [props.settings.min_price, props.settings.max_price],
      rating: [props.settings.min_rating, props.settings.max_rating]
    }

    this.saveRadius = this.saveRadius.bind(this)
    this.savePrice = this.savePrice.bind(this)
    this.saveRating = this.saveRating.bind(this)
  }

  saveRadius(data) {
    this.setState({ radius: [data[0], data[1]] })
  }

  savePrice(data) {
    this.setState({ price: [data[0], data[1]] })
  }
  
  saveRating(data) {
    this.setState({ rating: [data[0], data[1]] })
  }

  render() {
    return(
      <Card wrapperStyle={{ width: 300 }} >
        <Text style={styles.settingsHeading}>Settings</Text>
  
        <SettingsSlider 
          name="Radius"
          min={this.state.radius[0]} 
          max={this.state.radius[1]} 
          additional="Meters" 
          values={this.state.radius}
          onValuesChange={this.saveRadius}
          onValuesChangeFinish={this.saveRadius}
          maximum={7000}
          minimum={500} />

          <SettingsSlider 
          name="Price"
          min={'$'.repeat(this.state.price[0])} 
          max={'$'.repeat(this.state.price[1])} 
          values={this.state.price}
          onValuesChange={this.savePrice}
          onValuesChangeFinish={this.savePrice}
          maximum={4}
          minimum={1} />

          <SettingsSlider 
          name="Rating"
          min={this.state.rating[0]} 
          max={this.state.rating[1]} 
          values={this.state.rating}
          onValuesChange={this.saveRating}
          onValuesChangeFinish={this.saveRating}
          maximum={4}
          minimum={1} />

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
