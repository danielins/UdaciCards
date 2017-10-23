export const ADD_DECKS = 'ADD_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export const ADD_QUESTION = 'ADD_QUESTION'

export function addDecks(decks){
	return {
		type: ADD_DECKS,
		decks
	}
}

export function newDeck(title){
	return {
		type: NEW_DECK,
		title
	}
}

export function removeDeck(title){
	return {
		type: DELETE_DECK,
		title
	}
}

export function addQuestion(title, question){
	return {
		type: ADD_QUESTION,
		title,
		question
	}
}