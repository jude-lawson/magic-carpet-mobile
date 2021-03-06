import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const HomeButton = (props) =>  {
  return (
    <Icon
      containerStyle={styles.homeButtonContainer}
      size={50}
      color='#7998fe'
      name='ios-home'
      type='ionicon'
      onPress={props.handleClick} />
  );
}

export default HomeButton;

const styles = StyleSheet.create({
  homeButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20
  }
});
