import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'

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

	onPress = () => {

	}

	render(){

		const { decklist, decks } = this.props
		const { ready } = this.state

		if ( ready === false ){
			return <AppLoading />
		}

		return (
			<View style={ styles.container }>
				{ decklist.length
					? decklist.map((deck) => {
								const currentDeck = decks[deck]
								return (
									<TouchableOpacity key={currentDeck.title} onPress={ this.onPress } style={ styles.card }>
										<Text style={ styles.cardText }>{ currentDeck.title }</Text>
										<Text style={ styles.cardText }>{ `Questions: ${currentDeck.questions.length}` }</Text>
									</TouchableOpacity>
								)
							})
					: <Text>You don't have decks yet.</Text>
				}
			</View>
		)

	}

}

function mapStateToProps({decks}){
	return {
		decklist: decks && Object.keys(decks),
		decks
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
  	backgroundColor: lightbrown,
  	padding: 20,
  	borderRadius: 5,
  	borderColor: brown,
  	borderWidth: 15
  },
  cardText: {
  	color: white,
  	fontSize: 20
  }
})

export default connect(mapStateToProps)(DeckList)