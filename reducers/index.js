import { ADD_DECKS, NEW_DECK, DELETE_DECK } from '../actions/'

export default function decks(state = {}, action){

	const { type, title, decks } = action;

	switch ( type ) {

		case ADD_DECKS:
			return {
				...state,
				decks
			}

		case NEW_DECK:
			return {
				...state,
				[title]:{
					title,
					questions: []
				}
			}

		case DELETE_DECK:
			let newState = Object.assign({}, state)
			delete newState[title]
			return newState

		default:
			return state

	}

}