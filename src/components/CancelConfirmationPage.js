import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SecureStore } from 'expo';
import { Card, Button, Text } from 'react-native-elements';

import LandingPage from './LandingPage';
import HomeButton from './HomeButton';
import RidePage from './RidePage';
import ApiService from './ApiService';

export default class CancelConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false,
      feePrompt: null
    }

    this.checkForFee()

    this.checkForFee = this.checkForFee.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
    this.handleDecline = this.handleDecline.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
  }

  checkForFee() {
    if (this.props.fee) {
      console.log('fee');
      let formattedFee = (this.props.fee / 100).toFixed(2);
      this.setState(() => ({
        feePrompt: `Cancelling now will result in a cancellation fee of $${formattedFee}.`
      }));
      console.log(this.state.feePrompt);
    } else {
      console.log('no fee');
      this.setState(() => ({
        feePrompt: 'No cancellation fee if you cancel now.'
      }));
    }
  }

  handleConfirmation() {
    let lyft_token = SecureStore.getItemAsync('lyft_token').catch(() => console.log('no token!'));
    ApiService.goGet('cancel', 'delete', { ride_id: this.props.rideId, cost_token: this.props.costToken, lyft_token: lyft_token })
    .then((response) => response.json())
    .then((parsedResponse) => {
      console.log(parsedResponse);
    });
    this.setState(() => ({
      confirmed: 'confirmed'
    }));
  }

  handleDecline() {
    this.checkForFee();
    this.setState(() => ({
      confirmed: 'declined'
    }));
    console.log(this.state.confirmed);
  }

  handleHomeClick() {
    this.setState(() => ({
      confirmed: 'declined'
    }));
  }

  render() {
    let content;
    if (!this.state.confirmed) {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
          containerStyle={styles.cardStyle}
          wrapperStyle={{ height: 20 }}
          title='Confirm Ride Cancellation'>
            <Text style={styles.textStyle}>Are you sure you want to</Text>
            <Text style={styles.textStyle}>cancel your ride?</Text>
            <Text style={styles.textStyle}>{this.state.prompt}</Text>
          </Card>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.buttonStyle}
              title='YES'
              backgroundColor='#4fb859'
              onPress={this.handleConfirmation} />
            <Button
              buttonStyle={styles.buttonStyle}
              title="NO"
              backgroundColor='#db504a'
              onPress={this.handleDecline} />
          </View>
        </React.Fragment>
      )
    } else if (this.state.confirmed === 'confirmed') {
      content = <LandingPage />
    } else if (this.state.confirmed === 'declined') {
      content = <RidePage />
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 350
  },
  cardStyle: {
    height: 200,
    width: 250,
  },
  textStyle: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
    fontSize: 15,
  },
  buttonStyle: {
    marginTop: 12,
    marginLeft: 0,
    marginRight: 0,
    width: 100
  }
});
