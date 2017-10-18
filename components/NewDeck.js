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

class NewDeck extends Component {

	state = {
		deckName: ''
	}

	render(){

		return (
			<View style={ styles.container }>
				<View style={ styles.card }>
					<Text style={ styles.label }>Name of the your new deck:</Text>
					<TextInput
						style={ styles.input }
						onChangeTExt={ (text) => this.setState({deckName: text}) }
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
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  card: {
  	backgroundColor: lightbrown,
  	padding: 20,
  	borderRadius: 5,
  	borderColor: brown,
  	borderWidth: 15
  },
  label: {
  	color: white,
  	fontSize: 25,
  	marginBottom: 5
  },
  input: {
  	height: 40
  },
  submitBtn: {
  	backgroundColor: brown,
  	padding: 5
  },
  submitBtnText: {
  	color: white,
  	fontSize: 20,
  	textAlign: 'center'
  }
});


export default NewDeck