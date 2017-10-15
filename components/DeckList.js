import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { yellow } from '../utils/colors'

class DeckList extends Component {

	render(){

		return (
			<View style={ styles.container }>
				<Text>You don't have decks yet.</Text>
			</View>
		)

	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DeckList