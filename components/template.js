import React, { Component } from 'react'
import { View, TouchableOpacity, Platform, StyleSHeet } from 'react-native'

class NewDeck extends Component {
	state = {
		deckName: ''
	}

	render(){

		return (
			<View style={{ flex: 1 }}>
				<Text>Name of the your deck:</Text>
			</View>
		)

	}

}