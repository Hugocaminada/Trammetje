import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { Stop, Line } from '../../../@types/types'

interface StopState {
    departureStop: Stop | null
    line: Line | null
    destinationStop: Stop | null
}

const initialState: StopState = {
    departureStop: null,
    line: null,
    destinationStop: null,
}

export const counterSlice = createSlice({
    name: 'journey',
    initialState,
    reducers: {
        addDeparture: (state, action) => {
            state.departureStop = action.payload
        },
        addDestination: (state, action) => {
            state.destinationStop = action.payload
        },
        addLine: (state, action) => {
            state.line = action.payload
        },
        removeDeparture: (state) => {
            state.departureStop = initialState.departureStop
        },
        removeDestination: (state) => {
            state.destinationStop = initialState.destinationStop
        },
        removeLine: (state) => {
            state.line = initialState.line
        },
    },
})

export const {addDeparture, addDestination, addLine, removeDeparture, removeDestination, removeLine} = counterSlice.actions

export const selectDeparture = (state: RootState) => state.journey.departureStop
export const selectDestination = (state: RootState) => state.journey.destinationStop
export const selectLine = (state: RootState) => state.journey.line

export default counterSlice.reducer
