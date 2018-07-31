import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Text, Button, View } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { SecureStore } from 'expo';

import LandingPage from './LandingPage';
import HomeButton from './HomeButton';
import SettingSaveButton from './SettingSaveButton'

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    console.log("settings page")
    console.log(this.props.settings)
    this.state = {
      minRadius: this.props.settings.min_radius,
      maxRadius: this.props.settings.max_radius,
      selectedRadius: [this.props.settings.min_radius, this.props.settings.max_radius],

      minRating: this.props.settings.min_rating,
      maxRating: this.props.settings.max_rating,
      selectedRating: [this.props.settings.min_rating, this.props.settings.max_rating],


      minPrice: this.props.settings.min_price,
      maxPrice: this.props.settings.max_price,
      selectedPrice: [this.props.settings.min_price, this.props.settings.max_price],
      // price: this.props.settings.price
      // goHome: false
    }

    this.handleHomeClick = this.handleHomeClick.bind(this);
  }



  handleHomeClick() {
    this.props.saveSettings(this.currentSettings())
    // this.setState(() => ({
    //   goHome: true
    // }));
  }

  currentSettings(){
    return {
      min_radius: this.state.minRadius,
      max_radius: this.state.maxRadius,
      min_rating: this.state.minRating,
      max_rating: this.state.maxRating,
      min_price: this.state.minPrice,
      max_price: this.state.maxPrice,
      price: this.state.price
    }
  }

  saveRadius = (data) => {
    this.setState(() => ({
      minRadius: data[0],
      maxRadius: data[1],
      selectedRadius: [data[0], data[1]]
    }));
  }

  savePrice = (data) => {
    console.log(this.setPriceRange(data[0], data[1]).join(','))
    this.setState(() => ({
      minPrice: data[0],
      maxPrice: data[1],
      selectedPrice: [data[0], data[1]],
      price: this.setPriceRange(data[0], data[1]).join(",")
    }));
    console.log(this.state)
  }
  setPriceRange(min, max) {
    var numbers = []
    for (var i = min ; i <= max; i++) {
        numbers.push(i)
    }
    return numbers
  }

  saveRating = (data) => {
    this.setState(() => ({
      minRating: data[0],
      maxRating: data[1],
      selectedRating: [data[0], data[1]]
    }));
  }

  render() {
    let content;
    content = (
      <React.Fragment>
        <HomeButton handleHomeClick={this.handleHomeClick} />
        <Card
          wrapperStyle={{ width: 300 }}>
          <Text style={styles.card_heading}>
            Settings
          </Text>
          <Text style={styles.setting}>
            Radius:  {this.state.minRadius} - {this.state.maxRadius} Meters
          </Text>
          <MultiSlider style={styles.slider}
            values={this.state.selectedRadius}
            onValuesChange={this.saveRadius}
            onValuesChangeFinish={this.saveRadius}
            min={500}
            max={7000}
            step={1}
            snapped
          />

          <Text style={styles.setting}>
              Price:  { '$'.repeat(this.state.minPrice) } - { '$'.repeat(this.state.maxPrice) }
          </Text>
          <MultiSlider style={styles.slider}
            values={this.state.selectedPrice}
            onValuesChange={this.savePrice}
            onValuesChangeFinish={this.savePrice}
            min={1}
            max={4}
            step={1}
            allowOverlap
            snapped
          />

          <Text style={styles.setting}>
            Rating:  {this.state.minRating} - {this.state.maxRating} Stars
          </Text>
          <MultiSlider style={styles.slider}
            values={this.state.selectedRating}
            onValuesChange={this.saveRating}
            onValuesChangeFinish={this.saveRating}
            min={1}
            max={5}
            step={1}
            allowOverlap
            snapped
          /> 
          <SettingSaveButton clickEvent={() => this.handleHomeClick()}/>
        </Card>
      </React.Fragment>
    )
    
    // else if (this.state.goHome) {
    //   content = <LandingPage />
    // }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  card_heading: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  setting: {
    paddingStart: 5,
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5
  },
  slider: {
    marginBottom: 30,
    height: 70,
  }
});
