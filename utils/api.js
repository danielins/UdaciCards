import { AsyncStorage } from 'react-native'
import { formatDecks } from './helpers'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function fetchDecks(){
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(formatDecks)
}