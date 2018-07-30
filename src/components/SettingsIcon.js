import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export class SettingsIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Icon
        containerStyle={styles.settingsIcon}
        name='ios-cog'
        type='ionicon'
        size={40}
        color='#7998fe'
        onPress={this.props.renderSettings} />
    );
  }
}

const styles = StyleSheet.create({
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  }
});
