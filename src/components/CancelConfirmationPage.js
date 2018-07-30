import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';

import LandingPage from './LandingPage';
import HomeButton from './HomeButton';
import RidePage from './RidePage';

export default class CancelConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false,
      feePrompt: null
    }

    this.checkForFee()

    this.handleConfirmation = this.handleConfirmation.bind(this)
    this.handleDecline = this.handleDecline.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
  }

  checkForFee() {
    if (this.props.fee) {
      this.setState(() => ({
        feePrompt: `Cancelling now will result in a cancellation fee of ${this.props.fee}`
      }));
    } else {
      this.setState(() => ({
        feePrompt: `No cancellation fee if you cancel now.`
      }));
    }
  }

  handleConfirmation() {
    this.setState(() => ({
      confirmed: 'confirmed'
    }));
  }

  handleDecline() {
    this.setState(() => ({
      confirmed: 'declined'
    }));
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
              title='Yes'
              backgroundColor='#4fb859'
              onPress={this.handleConfirmation} />
            <Button
              buttonStyle={styles.buttonStyle}
              title="Nope."
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
