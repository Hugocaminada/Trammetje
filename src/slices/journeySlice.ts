import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import type { Stop, Line } from '../../@types/types'

interface JourneyState {
    departureStop: Stop | null
    line: Line | null
    destinationStop: Stop | null
}

const initialState: JourneyState = {
    departureStop: null,
    line: null,
    destinationStop: null,
}

export const journeySlice = createSlice({
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
        resetJourney: (state) => {
            state.line = initialState.line
            state.departureStop = initialState.departureStop
            state.destinationStop = initialState.destinationStop
        },
    },
})

export const {addDeparture, addDestination, addLine, removeDeparture, removeDestination, removeLine, resetJourney} = journeySlice.actions

export const selectDeparture = (state: RootState) => state.journey.departureStop
export const selectDestination = (state: RootState) => state.journey.destinationStop
export const selectLine = (state: RootState) => state.journey.line

export default journeySlice.reducer
