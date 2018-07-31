import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default class SettingsSlider extends Component {
  constructor(props) {
    super(props)
  }

	render() {
    return (
      <React.Fragment>
        <Text>
              {this.props.name}:  {this.props.min} - {this.props.max} {this.props.additional}
        </Text>
        <MultiSlider style={styles.slider}
          values={this.props.values}
          onValuesChange={this.props.onValuesChange}
          onValuesChangeFinish={this.props.onValuesChangeFinish}
          min={this.props.minimum}
          max={this.props.maximum}
          step={1}
          snapped
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  slider: {

  }
})
