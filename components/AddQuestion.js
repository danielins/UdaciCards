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

/* styes */
import { yellow, black, brown, lightbrown, white, red } from '../utils/colors'

/* redux */
import { connect } from 'react-redux'

/* api */
import { submitQuestion } from '../utils/api'

class AddQuestion extends Component {

	constructor(props){
    super(props)

    this.questionInput = null
    this.answerInput = null
  }

	state = {
		question: '',
		answer: '',
		error: ''
	}

	// submits the new question form
	sendNewQuestion = () => {

		const { dispatch, deckTitle } = this.props
		const { question, answer } = this.state

		// validation
		if ( question.length === 0 || answer.length === 0 ){
			this.setState({error: 'Fields cannot be empty'})
			return false
		}

		// updates api and store
		submitQuestion( deckTitle, { question, answer }, dispatch )

		// blurs the inputs
		this.questionInput.blur()
		this.answerInput.blur()

		// resets forms
		this.setState({
			answer: '',
			question: '',
			error: ''
		})

	}

	render(){

		const { deck } = this.props

		return (
			<KeyboardAvoidingView behavior='padding' style={ styles.container }>

				<View style={ styles.cardFront }>
					
					<Text style={ styles.cardText }>{ deck.title }</Text>
					<Text style={ styles.cardText }>{ `Cards: ${deck.questions.length}` }</Text>

					<Text style={ styles.label }>
						Question:
					</Text>
					<TextInput
						style={ styles.input }
						value={ this.state.question }
						ref={(input) => this.questionInput = input }
						onChangeText={ (text) => this.setState({question: text}) }
					/>

					<Text style={ styles.label }>
						Answer:
					</Text>
					<TextInput
						style={ styles.input }
						value={ this.state.answer }
						ref={(input) => this.answerInput = input }
						onChangeText={ (text) => this.setState({answer: text}) }
					/>

					<Text style={ styles.error }>{ this.state.error }</Text>

					<TouchableOpacity style={ styles.submitBtn } onPress={ this.sendNewQuestion }>
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
    justifyContent: 'center'
  },
  cardFront: {
  	backgroundColor: lightbrown,
    borderRadius: 5,
    borderColor: brown,
    borderWidth: 15,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    maxHeight: 400,
    margin: 10,
  	padding: 20,
  },
  cardText: {
  	color: white,
  	fontSize: 20,
  	textAlign: 'center'
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
    height: 40,
    justifyContent: 'center'
  },
  submitBtnText: {
  	color: white,
  	fontSize: 20,
  	textAlign: 'center'
  },
  error: {
    color: red,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5
  }
});


function mapStateToProps({decks}, {navigation}){
	const { deckTitle } = navigation.state.params
	return {
		deck: decks[deckTitle],
		deckTitle
	}
}

export default connect(mapStateToProps)(AddQuestion)