import React, { Component } from 'react';
import { LinearGradient } from 'expo';

export default class Gradient extends Component {
  render() {
    return (
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
    );
  }
}
