import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Text, Button, View } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { SecureStore } from 'expo';
import LandingPage from './LandingPage';
import HomeButton from './HomeButton';
import SettingSaveButton from './SettingSaveButton'
import { default_origin_latitude, default_origin_longitude } from '../../config.js'

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRadius: this.props.settings.radius,
      currentPrice: this.props.settings.price,
      currentRating: this.props.settings.rating,
      latitude: null,
      longitude: null,
      goHome: false
    }

    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  handleHomeClick() {
    this.setState(() => ({
      goHome: true
    }));
  }

  getLocation() {
    this.setState({
      latitude: defualt_origin_latitude,
      longitude: default_origin_longitude 
    })
  }

  saveRadius = (data) => {
    this.setState(() => ({
      currentRadius: data
    }));
  }

  savePrice = (data) => {
    this.setState(() => ({
      currentPrice: data
    }));
  }

  saveRating = (data) => {
    this.setState(() => ({
      currentRating: data
    }));
  }

  render() {
    let content;
    if (!this.state.goHome) {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
            wrapperStyle={{ width: 300 }}>
            <Text style={styles.card_heading}>
              Settings
            </Text>
            <Text style={styles.setting}>
              Radius:  {this.state.currentRadius[0]} - {this.state.currentRadius[1]} Miles
            </Text>
            <MultiSlider style={styles.slider}
              values={this.state.currentRadius}
              onValuesChange={this.saveRadius}
              onValuesChangeFinish={this.saveRadius}
              min={1}
              max={5}
              step={1}
              allowOverlap
              snapped
            />
            <Text style={styles.setting}>
                Price:  { '$'.repeat(this.state.currentPrice[0]) } - { '$'.repeat(this.state.currentPrice[1]) }
            </Text>
            <MultiSlider style={styles.slider}
              values={this.state.currentPrice}
              onValuesChange={this.savePrice}
              onValuesChangeFinish={this.savePrice}
              min={1}
              max={4}
              step={1}
              allowOverlap
              snapped
            />
            <Text style={styles.setting}>
              Rating:  {this.state.currentRating[0]} - {this.state.currentRating[1]} Stars
            </Text>
            <MultiSlider style={styles.slider}
              values={this.state.currentRating}
              onValuesChange={this.saveRating}
              onValuesChangeFinish={this.saveRating}
              min={1}
              max={5}
              step={1}
              allowOverlap
              snapped
            />
            <SettingSaveButton clickEvent={() => {
                let updated_settings = { radius: this.state.currentRadius, price: this.state.currentPrice, rating: this.state.currentRating }
                this.props.handleSave(updated_settings)
                this.getLocation()
                this.handleHomeClick()
              }}/>
          </Card>
        </React.Fragment>
      )
    } else if (this.state.goHome) {
      content = <LandingPage 
                  location={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                  settings={{ radius: this.state.currentRadius, price: this.state.currentPrice, rating: this.state.currentRating }} />
    }

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
