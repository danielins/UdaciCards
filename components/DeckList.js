/* core */
import React, { Component } from 'react'
import { AppLoading } from 'expo'
import { Dimensions } from 'react-native'

/* components */
import { View, ScrollView, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'

/* redux */
import { connect } from 'react-redux'
import { addDecks } from '../actions/'

/* api */
import { fetchDecks } from '../utils/api'

/* styles */
import { yellow, lightbrown, brown, white } from '../utils/colors'


class DeckList extends Component {

	state = {
		ready: false
	}

	componentDidMount(){

		const { dispatch } = this.props

		fetchDecks()
		.then((decks) => dispatch(addDecks(decks)))
		.then(() => this.setState(() => ({ready: true})))

	}

	// navigates to the chosen deck detail
	selectDeck = (deckTitle) => {

		const { navigation } = this.props

		navigation.navigate(
			'DeckDetail',
			{
				deckTitle
			}
		)

	}

	render(){

		const { decklist, decks } = this.props
		const { ready } = this.state

		if ( ready === false ){
			return <AppLoading />
		}

		return (
			<ScrollView style={{ backgroundColor: yellow, height: Dimensions.get('window').height }}>
				<View style={ styles.container }>
					{ decklist.length
						? decklist.map((deck) => {
									const currentDeck = decks[deck]
									return (
										<TouchableOpacity key={currentDeck.title} onPress={ () => this.selectDeck(currentDeck.title) } style={ styles.cardFront }>
											<Text style={ styles.cardText }>{ currentDeck.title }</Text>
											<Text style={ styles.cardText }>{ `Cards: ${currentDeck.questions.length}` }</Text>
										</TouchableOpacity>
									)
								})
						: <Text style={ styles.noCards }>You don't have decks yet.</Text>
					}
				</View>
			</ScrollView>
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
  	height: 200,
  	margin: 10,
  	maxHeight: 200,
  	padding: 20,
  },
  cardText: {
  	color: white,
  	fontSize: 20
  },
  noCards: {
  	fontSize: 20,
  	textAlign: 'center'
  }
})

function mapStateToProps({decks}){
	return {
		decklist: decks && Object.keys(decks),
		decks
	}
}

export default connect(mapStateToProps)(DeckList)