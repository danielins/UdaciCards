import { AsyncStorage } from 'react-native'
import { formatDecks } from './helpers'

import { NEW_DECK, DELETE_DECK } from '../actions/'
import { newDeck, removeDeck } from '../actions/'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

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
	sendDeck(title)
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