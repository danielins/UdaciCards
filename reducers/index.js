

export default function decks(state = {}, action){

	const { type, deck } = action;

	switch ( type ) {

		case 'NEW_DECK':
			return {
				...state,
				[deck.title]:{
					...deck
				}
			}

		default:
			return state

	}

}