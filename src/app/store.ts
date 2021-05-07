import {configureStore} from '@reduxjs/toolkit'
import journeyReducer from '../slices/journeySlice'
import userReducer from '../slices/userSlice'

const store = configureStore({
  reducer: {
    journey: journeyReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
