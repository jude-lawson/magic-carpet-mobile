import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, Button } from 'react-native-elements'

export default class Estimate extends Component {
  constructor(props) {
    super(props)

    this.handleYesClick = this.handleYesClick.bind(this)
    this.handleNoClick = this.handleNoClick.bind(this)
  }

  handleYesClick() {
    console.log('Yes!')
  }

  handleNoClick() {
    console.log('No!')
  }

	render() {
    let adventure = this.props.adventure
    let minimum_cost = `$${(adventure.price_range.min_cost / 100)}.00`
    let maximum_cost = `$${(adventure.price_range.max_cost / 100)}.00`

    return (
      <Card containerStyle={{ height: 200 }} >
        <Text style={{ textAlign: 'center' }}>This adventure will cost about {minimum_cost} - {maximum_cost}</Text>
        <Text style={{ textAlign: 'center' }}>Would you like to call a Lyft?</Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            title='YES'
            backgroundColor='#4fb859'
            onPress={this.handleYesClick}
             />
          <Button
            buttonStyle={styles.buttonStyle}
            title='NO'
            backgroundColor='#db504a'
            onPress={this.handleNoClick}
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
