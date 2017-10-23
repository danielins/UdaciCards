/* core */
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'

/* components */
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'

/* redux */
import { connect } from 'react-redux'

/* api */
import { eraseDeck } from '../utils/api'

/* styles */
import { yellow, lightbrown, brown, white, black, deepblack, red } from '../utils/colors'

class DeckDetail extends Component {

  // do not rerender if there will be no deck (after deletion)
  shouldComponentUpdate({deck}){
    return deck ? true : false
  }

  // navigates to the new question form
  addQuestion = (deckTitle) => {

    const { navigation } = this.props

    navigation.navigate(
      'AddQuestion',
      {
        deckTitle
      }
    )

  }

  // navigates to the quiz screen
  startQuiz = (deckTitle) => {

    const { navigation, deck } = this.props

    navigation.navigate(
      'Quiz',
      {
        deck
      }
    )

	}

  // deletes this deck
	deleteDeck = (deckTitle) => {

		const { dispatch, navigation } = this.props

    // deletes from the store and the api
		eraseDeck(deckTitle, dispatch)

    // go back to deck listing
    navigation.dispatch(NavigationActions.back())

	}

	render(){

    const { deck } = this.props

		return (
			<View style={ styles.container }>

				<View style={ styles.cardFront }>
					<Text style={ styles.cardText }>{ deck.title }</Text>
					<Text style={ styles.cardText }>{ `Cards: ${deck.questions.length}` }</Text>
				</View>

				<TouchableOpacity onPress={ () => this.addQuestion(deck.title) } style={[ styles.button, {backgroundColor: deepblack} ]}>
					<Text style={ styles.buttonText }>Add Card</Text>
				</TouchableOpacity>

        {
          deck.questions.length
          ? ( <TouchableOpacity onPress={ () => this.startQuiz(deck.title) } style={[ styles.button ]}>
          			<Text style={ styles.buttonText }>Start Quiz</Text>
          		</TouchableOpacity> )
          : null
        }

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