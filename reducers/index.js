import { ADD_DECKS, NEW_DECK } from '../actions/'

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
					question: []
				}
			}

		default:
			return state

	}

}