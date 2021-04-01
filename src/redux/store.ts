import {createStore, combineReducers} from 'redux'
import counter from './reducers/counterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    counter,
})

const store = createStore(
  rootReducer, composeWithDevTools()
)

export default store
