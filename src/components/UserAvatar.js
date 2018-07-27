import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default class UserAvatar extends Component {
  render() {
    return (
      <Icon
        containerStyle={styles.userAvatarContainer}
        size={45}
        color='#7998fe' 
        name='ios-person'
        type='ionicon' />
    );
  }
}

const styles = StyleSheet.create({
  userAvatarContainer: {
    position: 'absolute',
    top: 35,
    right: 70
  }
})
