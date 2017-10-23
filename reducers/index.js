import { ADD_DECKS, NEW_DECK, DELETE_DECK, ADD_QUESTION } from '../actions/'

function decks(state = {}, action){

	const { type, title, decks, question } = action;

	switch ( type ) {

		case ADD_DECKS:
			return {
				...state,
				decks
			}

		case NEW_DECK:
			return {
				...state,
				decks:{
					...state.decks,	
					[title]:{
						title,
						questions: []
					}
				}
			}

		case DELETE_DECK:
			return {
				...state,
				decks: Object.keys(state.decks)
							.filter((deck) => deck.title === title)
							.reduce((decks, current) => {
								decks[current] = state.decks[current]
								return decks
							}, {})
			}

		case ADD_QUESTION:
			return {
				...state,
				decks: {
					...state.decks,
					[title]: {
						title,
						questions: [
							...state.decks[title].questions,
							question
						]
					}
				}
			}

		default:
			return state

	}

}

export default decks