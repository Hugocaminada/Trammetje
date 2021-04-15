import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import HomeScreen from './src/components/Homescreen'
import store from './src/app/store'

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="light-content" />
    <HomeScreen />
  </Provider>
)

export default App
