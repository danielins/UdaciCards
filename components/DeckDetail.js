import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'

/* redux */
import { connect } from 'react-redux'
import { eraseDeck } from '../utils/api'

/* styles */
import { yellow, lightbrown, brown, white, black, deepblack, red } from '../utils/colors'

class DeckDetail extends Component {

	addQuestion = () => {

	}

	startQuiz = () => {

	}

	deleteDeck = (deckTitle) => {

		const { dispatch, navigation } = this.props

		eraseDeck(deckTitle, dispatch)

	}

	render(){

		const { deck, navigation } = this.props

    if ( !deck ){
      navigation.back('Home')
      return false
    }

		return (
			<View style={ styles.container }>

				<TouchableOpacity onPress={ this.onPress } style={ styles.cardFront }>
					<Text style={ styles.cardText }>{ deck.title }</Text>
					<Text style={ styles.cardText }>{ `Cards: ${deck.questions.length}` }</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={ this.addQuestion } style={[ styles.button, {backgroundColor: deepblack} ]}>
					<Text style={ styles.buttonText }>Add Card</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={ this.startQuiz } style={[ styles.button ]}>
					<Text style={ styles.buttonText }>Start Quiz</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={ () => this.deleteDeck(deck.title) } style={[ styles.button, {backgroundColor: red} ]}>
					<Text style={ styles.buttonText }>Delete Deck</Text>
				</TouchableOpacity>

			</View>
		)

	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: yellow,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  cardFront: {
  	backgroundColor: lightbrown,
  	borderRadius: 5,
  	borderColor: brown,
  	borderWidth: 15,
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	maxHeight: 200,
  	margin: 10,
  	padding: 20,
  },
  cardText: {
  	color: white,
  	fontSize: 20
  },
  button: {
  	alignItems: 'center',
  	backgroundColor: black,
  	flex: 1,
  	maxHeight: 40,
  	alignItems: 'center',
  	justifyContent: 'center',
  	margin: 10,
  },
  buttonText: {
  	color: white,
  	fontSize: 20,
  	lineHeight: 40,
  }
})

function mapStateToProps({decks}, {navigation}){
	const { deckTitle } = navigation.state.params
	return {
		deck: decks[deckTitle],
		deckTitle,
	}
}

export default connect(mapStateToProps)(DeckDetail)