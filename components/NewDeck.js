import React, { Component } from 'react'
import { 
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	StyleSheet 
} from 'react-native'
import { yellow, black, brown, lightbrown, white } from '../utils/colors'

import { connect } from 'react-redux'

/* api */
import { submitDeck } from '../utils/api'

class NewDeck extends Component {

	state = {
		deckName: ''
	}

  sendNewDeck = () => {

    const { dispatch } = this.props;
    const { deckName } = this.state

    submitDeck(deckName, dispatch)

  }

	render(){

		return (
			<View style={ styles.container }>
				<View style={ styles.cardFront }>
					<Text style={ styles.label }>Name of the your new deck:</Text>
					<TextInput
						style={ styles.input }
						onChangeText={ (text) => this.setState({deckName: text}) }
					/>
					<TouchableOpacity style={ styles.submitBtn } onPress={ this.sendNewDeck }>
						<Text style={ styles.submitBtnText }>Send</Text>
					</TouchableOpacity>
				</View>
			</View>
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
    maxHeight: 200,
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
    height: 45,
  },
  submitBtnText: {
  	color: white,
  	fontSize: 20,
  	textAlign: 'center'
  }
});


export default connect()(NewDeck)