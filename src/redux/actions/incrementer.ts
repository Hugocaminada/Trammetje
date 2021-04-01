import { INCREMENT_COUNT, DECREMENT_COUNT } from './types'

export const incrementCount = (counter: number) => ({
    type: INCREMENT_COUNT,
    payload: counter,
})

export const decrementCount = (counter: number) => ({
    type: DECREMENT_COUNT,
    payload: counter,
})
