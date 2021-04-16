import {configureStore} from '@reduxjs/toolkit'
import stopReducer from '../features/counter/stopSlice'

const store = configureStore({
  reducer: {
    travelStops: stopReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
