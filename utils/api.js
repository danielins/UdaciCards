import { AsyncStorage } from 'react-native'
import { formatDecks } from './helpers'

import { NEW_DECK } from '../actions/'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function fetchDecks(){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(formatDecks)
}

export function sendDeck(title){
	return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
		[title]: {
			title,
			questions: []
		}
	}))
}

export function submitDeck(title, dispatch){
	sendDeck(title)
	.then(() => dispatch({
		type: NEW_DECK,
		title
	}))
}