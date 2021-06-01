import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

interface UserState {
    travelledJourneys: number
    seenAttractions: number
    savedCo2: number
}

const initialState: UserState = {
    travelledJourneys: 0,
    seenAttractions: 0,
    savedCo2: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addTravelledJourney: (state) => {
            state.travelledJourneys += 1
        },
        addSeenAttraction: (state, action: PayloadAction<number>) => {
            state.seenAttractions += action.payload
        },
        addSavedCo2: (state, action: PayloadAction<number>) => {
            state.savedCo2 += action.payload
        },
    },
})

export const {addTravelledJourney, addSeenAttraction, addSavedCo2} = userSlice.actions

export const selectTravelledJourneys = (state: RootState) => state.user.travelledJourneys
export const selectSeenAttractions = (state: RootState) => state.user.seenAttractions
export const selectSavedCo2 = (state: RootState) => state.user.savedCo2

export default userSlice.reducer
