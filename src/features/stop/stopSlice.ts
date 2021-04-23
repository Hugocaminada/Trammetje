import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { Stop } from '../../../@types/types'

interface StopState {
    departureStop: Stop | null
    destinationStop: Stop | null
}

const initialState: StopState = {
    departureStop: null,
    destinationStop: null,
}

export const counterSlice = createSlice({
    name: 'travelStops',
    initialState,
    reducers: {
        addDeparture: (state, action) => {
            state.departureStop = action.payload
        },
        addDestination: (state, action) => {
            state.destinationStop = action.payload
        },
        removeDeparture: (state) => {
            state.departureStop = initialState.departureStop
        },
        removeDestination: (state) => {
            state.destinationStop = initialState.destinationStop
        },
    },
})

export const {addDeparture, addDestination, removeDeparture, removeDestination} = counterSlice.actions

export const selectDeparture = (state: RootState) => state.travelStops.departureStop
export const selectDestination = (state: RootState) => state.travelStops.destinationStop

export default counterSlice.reducer