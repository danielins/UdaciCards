/* core */
import React from 'react'
import { StyleSheet, StatusBar, Platform, Text, View } from 'react-native'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'

/* redux */
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

/* components */
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'

/* style */
import { yellow, white, black, deepblack, lightbrown } from './utils/colors'

function CardsStatusBar ({ backgroundColor, ...props }){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    headerTintColor: deepblack,
    style: {
      height: 56,
      backgroundColor: lightbrown
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightbrown
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Question',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightbrown
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Add Question',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightbrown
      }
    }
  }
})

const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={ store }>
        <View style={{ flex: 1 }}>
          <CardsStatusBar backgroundColor={yellow} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}