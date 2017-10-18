const defaultDecks = {
	Hufflepuff: {
		title: 'Hufflepuff',
		questions: [
			{
				question: 'Who is the founder of Hufflepuff house?',
				answer: 'Helga Hufflepuff'
			},
			{
				question: 'What animal is the symbol of Hufflepuff house?',
				answer: 'A badger'
			},
			{
				question: 'Which colors represent the Hufflepuff house?',
				answer: 'Yellow and black'
			},
			{
				question: 'What are the primal characters of a true Hufflepuff?',
				answer: 'Dedication, friendship, loyality, kindness'
			},
			{
				question: 'Finally, which house of the best Hogwarts house?',
				answer: 'Hufflepuff. Duh.'
			}
		]
	}
}


export function formatDecks(decks) {
	return decks === null
	? defaultDecks
	: JSON.parse(decks)
}