import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import type { Stop, Line } from '../../@types/types'

interface JourneyState {
    departureStop: Stop | undefined
    line: Line | undefined
    destinationStop: Stop | undefined
    stopIndex: number
}

const initialState: JourneyState = {
    departureStop: undefined,
    line: undefined,
    destinationStop: undefined,
    stopIndex: 0,
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
        setStopIndex: (state, action) => {
            state.stopIndex = action.payload
        },
        incrementStopIndex: (state) => {
            state.stopIndex += 1
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
        resetStopIndex: (state) => {
            state.stopIndex = 0
        },
        resetJourney: (state) => {
            state.line = initialState.line
            state.departureStop = initialState.departureStop
            state.destinationStop = initialState.destinationStop
        },
    },
})

export const {addDeparture, addDestination, addLine, setStopIndex, incrementStopIndex, removeDeparture, removeDestination, removeLine, resetStopIndex, resetJourney} = journeySlice.actions
export const selectDeparture = (state: RootState) => state.journey.departureStop
export const selectDestination = (state: RootState) => state.journey.destinationStop
export const selectLine = (state: RootState) => state.journey.line

export default journeySlice.reducer
