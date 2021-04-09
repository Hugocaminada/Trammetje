import React from 'react'
import {Provider} from 'react-redux'
import HomeScreen from './src/components/Homescreen'
import store from './src/app/store'

type Props = {
  componentId: string
}

const App = ({componentId}: Props) => (
  <Provider store={store}>
    <HomeScreen componentId={componentId} />
  </Provider>
)

export default App
