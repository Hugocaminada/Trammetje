import React from 'react'
import {Provider} from 'react-redux'
import HomeScreen from './src/components/Homescreen/Homescreen'
import store from './src/redux/store'

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
)

export default App
