import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';

import LandingPage from './LandingPage';
import HomeButton from './HomeButton';
import RidePage from './RidePage';

export default class EstimatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmed: false
    }

    this.handleConfirmation = this.handleConfirmation.bind(this)
    this.handleDecline = this.handleDecline.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
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

  displayRange(min, max){
    var numbers = []
    console.log(min)
    console.log(max)
    numbers.push(min/100)
    numbers.push(max/100)

    return numbers.join(' - ')
  }

  render() {
    let content;
    let range = this.displayRange(this.props.price_range.min_cost, this.props.price_range.max_cost,)
    if (!this.state.confirmed) {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
          containerStyle={styles.cardStyle}
          wrapperStyle={{ height: 20 }}
          title='Confirm Your Price'>
            <Text style={styles.textStyle}>This ride will cost: {range}$ </Text>
            <Text style={styles.textStyle}>Does this work for you?</Text>
          </Card>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.buttonStyle}
              title='YES'
              backgroundColor='#4fb859'
              onPress={this.handleConfirmation} />
            <Button
              buttonStyle={styles.buttonStyle}
              title='NO'
              backgroundColor='#db504a'
              onPress={this.handleDecline} />
          </View>
        </React.Fragment>
      )
    } else if (this.state.confirmed === 'confirmed') {
      content = <RidePage data={this.props.data} />
    } else if (this.state.confirmed === 'declined') {
      content = <LandingPage />
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
    width: 250
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 17,
  },
  buttonStyle: {
    marginTop: 12,
    marginLeft: 0,
    marginRight: 0,
    width: 100
  }
});
