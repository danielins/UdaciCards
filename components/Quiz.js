/* core */
import React, { Component } from 'react'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { Dimensions } from 'react-native'
import { NavigationActions } from 'react-navigation'

/* components */
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Animated
} from 'react-native'

/* styles */
import { yellow, lightbrown, brown, white, black, deepblack, green, red } from '../utils/colors'

class Quiz extends Component {

	state = {
		questions: [],
		currentQuestion: 0,
		cardFlipped: false,
		correct: 0,
	}

	componentDidMount(){

		// clear notification to remind of studying
		clearLocalNotification()
    .then(setLocalNotification)

	}

	componentWillMount(){

		const { deck } = this.props.navigation.state.params
		
		// shuffles deck
		this.setState((state) => {
			return {
				questions: deck.questions.sort(() => 0.5 - Math.random())
			}
		})

		// sets up the rotation of the card

		this.animatedValue = new Animated.Value(0)
		this.value = 0
		this.animatedValue.addListener(({value}) => {
			this.value = value
		})

		this.frontInterpolateRotate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['0deg', '180deg']
		})
		this.backInterpolateRotate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ['180deg', '360deg']
		})

		this.frontInterpolateOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [1, 0]
		})
		this.backInterpolateOpacity = this.animatedValue.interpolate({
			inputRange: [89, 90],
			outputRange: [0, 1]
		})

	}

	/**
	 * Flips the card back and forth
	 */
	flipCard = () => {
		if ( this.value >= 90 ){
			Animated.spring( this.animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10
			}).start()
			this.setState({ cardFlipped: false })
		} else {
			Animated.spring( this.animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10
			}).start()
			this.setState({ cardFlipped: true })
		}
	}

	/**
	 * Sinalizes a right answer
	 */
	rightAnswer = () => {

		// updates the score and the index of the question
		this.setState((state) => {
			return {
				currentQuestion: state.currentQuestion + 1,
				correct: state.correct + 1
			}
		})

		// flips the card for the next question
		this.flipCard()

	}

	/**
	 * Sinalizes a wrong answer
	 */
	wrongAnswer = () => {

		// updates the index of the question
		this.setState((state) => {
			return { 
				currentQuestion: state.currentQuestion + 1
			}
		})

		// flips the card for the next question
		this.flipCard()
	
	}

	// starts a new quiz from the same deck
	retakeQuiz = () => {

		// shuffles deck and reset results
		this.setState((state) => {
			return {
				questions: state.questions.sort(() => 0.5 - Math.random()),
				currentQuestion: 0,
				correct: 0
			}
		})

		this.flipCard()

	}

	// returns to deck detail
	goBack = () => {
		const { navigation } = this.props
		navigation.dispatch(NavigationActions.back())
	}

	render(){

		const { questions, currentQuestion, correct, cardFlipped } = this.state
		const totalQuestions = questions.length

		// animation variables
		const frontAnimatedStyle = {
			transform: [
				{rotateY: this.frontInterpolateRotate}
			],
			opacity: this.frontInterpolateOpacity
		}
		const backAnimatedStyle = {
			transform: [
				{rotateY: this.backInterpolateRotate}
			],
			opacity: this.backInterpolateOpacity
		}

		// if questions are over
		const hasQuestions = currentQuestion < totalQuestions ? true : false

		return (
			<View style={ styles.container }>
				{ hasQuestions ? 
					(
						<View style={ styles.container }>
							<Text style={ styles.total }>
								{ `Question ${ currentQuestion+1 } of ${ totalQuestions }` }
							</Text>

							<View style={ styles.cardHolder }>
								<Animated.View style={[styles.cardFront, frontAnimatedStyle]}>
									<Text style={ styles.cardText }>{ questions[currentQuestion].question }</Text>
								</Animated.View>
								<Animated.View style={[backAnimatedStyle, styles.cardFront, styles.cardBack]}>
									<Text style={ styles.cardText }>{ questions[currentQuestion].answer }</Text>
								</Animated.View>
							</View>

							{ cardFlipped
								? (
									<View style={{ height: 200 }}>
										<TouchableOpacity onPress={ this.rightAnswer } style={[ styles.button, {backgroundColor: green} ]}>
											<Text style={ styles.buttonText }>Right answer</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={ this.wrongAnswer } style={[ styles.button, {backgroundColor: red} ]}>
											<Text style={ styles.buttonText }>Wrong answer</Text>
										</TouchableOpacity>
									</View>
								)
								: (
									<TouchableOpacity onPress={ this.flipCard } style={ styles.button }>
										<Text style={ styles.buttonText }>Get answer!</Text>
									</TouchableOpacity>
								)
							}

						</View>
					) : (
						<View style={ styles.container }>

							<View style={ styles.cardHolder }>
								<View style={ styles.cardFront }>
									<Text style={ styles.cardText }>
										You got { correct } right answers of { totalQuestions }!
										That's { `${ ((correct*100)/totalQuestions).toFixed(2) }%!` }
									</Text>
								</View>
							</View>

							<TouchableOpacity onPress={ this.retakeQuiz } style={ styles.button }>
								<Text style={ styles.buttonText }>Take quiz again</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={ this.goBack } style={[styles.button, {backgroundColor: deepblack}]}>
								<Text style={ styles.buttonText }>Back to deck</Text>
							</TouchableOpacity>

						</View>
					)
				}
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
  cardHolder: { 
  	position: 'relative',
  	height: 200,
  	marginBottom: 10
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
  	width: Dimensions.get('window').width * 0.95,
  	margin: 10,
  	padding: 20,
  	backfaceVisibility: 'hidden',
  	position: 'absolute',
  	top: 0
  },
  cardBack: {
  	backgroundColor: brown
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
  },
  total: {
  	fontSize: 15,
  	textAlign: 'center'
  }
})

export default Quiz