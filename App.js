/* core */
import React from 'react'
import { StyleSheet, StatusBar, Platform, Text, View } from 'react-native'
import { Constants } from 'expo'

/* redux */
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

/* components */
import { TabNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'

/* style */
import { yellow, deepblack, lightbrown } from './utils/colors'

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
    activeTintColor: deepblack,
    style: {
      height: 56,
      backgroundColor: lightbrown
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ createStore(reducer) }>
        <View style={{ flex: 1 }}>
          <CardsStatusBar backgroundColor={yellow} barStyle='light-content' />
          <Tabs />
        </View>
      </Provider>
    );
  }
}