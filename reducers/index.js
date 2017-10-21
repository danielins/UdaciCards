import { ADD_DECKS, NEW_DECK, DELETE_DECK } from '../actions/'

function decks(state = {}, action){

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
				decks:{
					...state.decks,	
					[title]:{
						title,
						questions: []
					}
				}
			}

		case DELETE_DECK:
			let newState = Object.assign({}, state)
			newState.decks[title] = undefined
			delete newState.decks[title]
			console.log('DELETE DECK', newState)
			return newState

		default:
			return state

	}

}

export default decks