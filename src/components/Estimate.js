import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, Button } from 'react-native-elements'

export default class Estimate extends Component {
  render() {
    return (
      <Card containerStyle={{ height: 200 }} >
        <Text style={{ textAlign: 'center' }}>This adventure will cost about {this.props.minimum_cost} - {this.props.maximum_cost}</Text>
        <Text style={{ textAlign: 'center' }}>Would you like to call a Lyft?</Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            title='YES'
            backgroundColor='#4fb859'
            onPress={this.props.handleYesClick}
            />
          <Button
            buttonStyle={styles.buttonStyle}
            title='NO'
            backgroundColor='#db504a'
            onPress={this.props.handleNoClick}
            />
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 100
  },
  cardStyle: {
    height: 200,
    width: 250
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 17,
  },
  buttonStyle: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    width: 100
  }
});
