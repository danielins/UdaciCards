export const ADD_DECKS = 'ADD_DECKS'
export const NEW_DECK = 'NEW_DECK'

export function addDecks(decks){
	return {
		type: ADD_DECKS,
		decks
	}
}

export function newDeck(deck){
	return {
		type: NEW_DECK,
		deck
	}
}