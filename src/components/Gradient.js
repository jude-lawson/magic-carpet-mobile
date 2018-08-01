import React, { Component } from 'react';
import { LinearGradient } from 'expo';

export default class Gradient extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#ffffff', '#ffffff']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 1000
        }}
      />
    );
  }
}
