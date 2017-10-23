/* core */
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

// =================================================
//
// DECK HELPER
//
// =================================================

// the default deck when there's nothing on the app storage
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

// formats the decks from the api or the default one
export function formatDecks(decks) {
	return decks === null
	? defaultDecks
	: JSON.parse(decks)
}

// =================================================
//
// NOTIFICATION HELPER
//
// =================================================

const NOTIFICATION_KEY = "UdaciCards:notifications"

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
  return {
    title: 'Time to study!',
    body: "Don't forget to take a quiz to stay sharp!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      prority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if ( status === 'granted' ) {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

            }
          })
      }
    })
}