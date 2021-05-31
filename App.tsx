import React from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import {QueryClientProvider, QueryClient} from 'react-query'
import HomeScreen from './src/components'
import store from './src/app/store'

const queryClient = new QueryClient()

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="light-content" />
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  </Provider>
)

export default App
