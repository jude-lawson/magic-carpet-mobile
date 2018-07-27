import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';

import LoginPage from './src/components/LoginPage'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient 
          colors={['#03063b', '#7998fe']} 
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 1000
          }}
        />
          <LoginPage />
        {/* </LinearGradient> */}
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
