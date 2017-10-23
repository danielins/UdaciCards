/* core */
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'

/* components */
import { 
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet 
} from 'react-native'

/* redux */
import { connect } from 'react-redux'

/* api */
import { submitDeck } from '../utils/api'

/* styles */
import { yellow, black, brown, lightbrown, white, red } from '../utils/colors'

class NewDeck extends Component {

  constructor(props){
    super(props)

    this.newDeckInput = null
  }

	state = {
		deckName: '',
    error: '',
	}

  // submits the new deck form
  sendNewDeck = () => {

    const { decklist, dispatch } = this.props
    const deckTitle = this.state.deckName.trim()

    // check if it' empty
    if ( deckTitle.length === 0 ){
      this.setState({error: 'Deck name cannot be empty'})
      return false
    }

    // checks if there's a deck with this name already (it shouldn't rewrite it)
    if ( decklist.length && decklist.find((deck) => deck === deckTitle) ){
      this.setState({error: 'A deck with this name already exists.'})
      return false
    }

    // resets form
    this.setState({deckName: '', error: ''})

    // blurs the input
    this.newDeckInput.blur()

    // updates api and store
    // goes to the page of the new deck
    submitDeck(deckTitle, dispatch)
    .then(() => this.toDeck(deckTitle))

  }

  // goes to the detail page of the deck created
  toDeck = (deckTitle) => {

    const { navigation } = this.props

    navigation.navigate(
      'DeckDetail',
      {
        deckTitle
      }
    )

  }

	render(){

		return (
			<KeyboardAvoidingView behavior='padding' style={ styles.container }>
				<View style={ styles.cardFront }>
					<Text style={ styles.label }>Name of the your new deck:</Text>
					<TextInput
						style={ styles.input }
            value={ this.state.deckName }
            ref={(input) => this.newDeckInput = input}
						onChangeText={ (text) => this.setState({deckName: text}) }
					/>
          <Text style={ styles.error }>{ this.state.error }</Text>
					<TouchableOpacity style={ styles.submitBtn } onPress={ this.sendNewDeck }>
						<Text style={ styles.submitBtnText }>Send</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		)

	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: yellow,
    alignItems: 'stretch',
    justifyContent: 'space-around'
  },
  cardFront: {
  	backgroundColor: lightbrown,
    borderRadius: 5,
    borderColor: brown,
    borderWidth: 15,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    maxHeight: 250,
    margin: 10,
  	padding: 20,
  },
  label: {
  	color: white,
  	fontSize: 25,
  	marginBottom: 15
  },
  input: {
    flex: 1,
    fontSize: 20,
    paddingBottom: 5,
    textAlign: 'center',
  	height: 40
  },
  submitBtn: {
  	backgroundColor: brown,
  	padding: 5,
    flex: 1,
    height: 30,
    justifyContent: 'center'
  },
  submitBtnText: {
  	color: white,
  	fontSize: 20,
  	textAlign: 'center'
  },
  error: {
    color: red,
    marginBottom: 5,
    fontSize: 15,
    textAlign: 'center'
  }
});

function mapStateToProps({decks}){
  return {
    decklist: decks && Object.keys(decks),
  }
}

export default connect(mapStateToProps)(NewDeck)