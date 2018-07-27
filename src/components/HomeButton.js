import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class HomeButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Icon
        containerStyle={styles.homeButtonContainer}
        size={50}
        color='#7998fe'
        name='home'
        onPress={this.props.handleHomeClick} />
    );
  }
}

const styles = StyleSheet.create({
  homeButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20
  }
});
