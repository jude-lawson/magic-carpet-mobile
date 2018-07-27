import React, { Component } from 'react';
import { Card, Slider, Text, Button } from 'react-native-elements';

import LandingPage from './LandingPage';
import HomeButton from './HomeButton';

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goHome: false
    }

    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  handleHomeClick() {
    this.setState(() => ({
      goHome: true
    }));
  }

  render() {
    let content;
    if (!this.state.goHome) {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
            wrapperStyle={{ width: 300 }}
            title='Settings'>
            <Text>Radius: </Text>
            <Slider
              thumbTintColor='#9659fb' />
            <Text>Minimum Price: </Text>
            <Slider 
              thumbTintColor='#9659fb' />
            <Text>Rating: </Text>
            <Slider
              thumbTintColor='#9659fb' />
            <Button
              buttonStyle={{
                marginTop: 12
              }}
              backgroundColor='#7998fe'
              title='SAVE' />
          </Card>
        </React.Fragment> 
      )
    } else if (this.state.goHome) {
      content = <LandingPage />
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}
