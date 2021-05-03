import {configureStore} from '@reduxjs/toolkit'
import journeyReducer from '../features/stop/journeySlice'

const store = configureStore({
  reducer: {
    journey: journeyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
