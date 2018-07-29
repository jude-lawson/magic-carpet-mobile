import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

// import LoginPage from './src/components/LoginPage'
import LandingPage from './src/components/LandingPage'
import Gradient from './src/components/Gradient'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Gradient />
        <LandingPage />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#030622'
  }
});
