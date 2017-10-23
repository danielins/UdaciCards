/* core */
import { AsyncStorage } from 'react-native'
import { formatDecks } from './helpers'

/* redux */
import { NEW_DECK, DELETE_DECK } from '../actions/'
import { newDeck, removeDeck, addQuestion } from '../actions/'

//APPLICATION STORAGE KEY
export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

// =================================================
//
// GETTING DECKS
//
// =================================================

/**
 * API call that returns all saved decks
 */
export function fetchDecks(){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(formatDecks)
}

// =================================================
//
// SUBMITTING NEW DECK
//
// =================================================

/**
 * API call that submits a new blank deck object
 * @param title {String} - the title of the new deck. this title will also be its identifier
 */
export function sendDeck(title){
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

/**
 * submitDeck thunk function
 * - submits new deck
 * calls the API and then dispatches the action to the store
 * @param title {String} - title of the new deck
 * @param dispatch {Function} - dispatch prop from the store 
 */
export function submitDeck(title, dispatch){
	return sendDeck(title)
	.then(() => dispatch( newDeck(title) ))
}

// =================================================
//
// REMOVING A DECK
//
// =================================================


/**
 * API call that submits a new blank deck object
 * @param title {String} - the title of the new deck. this title will also be its identifier
 */
export function deleteDeck(title){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then((decks) => {
		const data = JSON.parse(decks)
		data[title] = undefined
		delete data[title]
		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
	})
}


/**
 * eraseDeck thunk function
 * - erases a existing deck
 * calls the API and then dispatches the action to the store
 * @param title {String} - title of deck being deleted
 * @param dispatch {Function} - dispatch prop from the store
 */
export function eraseDeck(title, dispatch){
	return deleteDeck(title)
	.then(() => dispatch( removeDeck(title) ))
}


// =================================================
//
// ADDING A QUESTION
//
// =================================================

/**
 * API call that submits a new question to a deck
 * @param deckTitle {String} - title of the deck that will receive question
 * @param questionObj {Object} - object with question and answer strings
 */
export function sendQuestion(deckTitle, questionObj){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
	.then((decks) => {
		const data = JSON.parse(decks)
		data[deckTitle].questions.push( questionObj )
		AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
	})
}

/**
 * submitDeck thunk function
 * - submits new deck
 * calls the API and then dispatches the action to the store
 * @param deckTitle {String} - title of the deck that will receive question
 * @param questionObj {Object} - object with question and answer strings
 * @param dispatch {Function} - dispatch prop from the store 
 */
export function submitQuestion(deckTitle, questionObj, dispatch){
	return sendQuestion(deckTitle, questionObj)
	.then(() => dispatch( addQuestion(deckTitle, questionObj) ))
}