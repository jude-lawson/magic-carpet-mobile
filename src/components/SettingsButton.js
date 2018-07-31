import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsButton = (props) => {
  return (
    <Icon
      containerStyle={styles.settingsIcon}
      name='ios-cog'
      type='ionicon'
      size={40}
      color='#7998fe'
      onPress={props.handleClick} />
  );
}

export default SettingsButton;

const styles = StyleSheet.create({
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  }
});
