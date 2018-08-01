import React, {Component} from 'react'
import { Animated, Text, View } from 'react-native';

export default class AnimatedSettings extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  }

  componentDidMount(){
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start
  }

	render() {
    let { fadeAnim } = this.state;

    return (
       <Animated.Settings
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}

      </Animated.Settings>
    );
    
  }
}