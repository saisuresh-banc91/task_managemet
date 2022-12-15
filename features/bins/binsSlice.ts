import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
const initial: { id: number }[] = []

export const binsSlice = createSlice({
    name: 'bins',
    initialState: initial,
    reducers: {
        replace: (state, action: PayloadAction<{ id: number }[]>) => {
            return action.payload
        },
        add: (state, action: PayloadAction<{ id: number }>) => {
            return [...state, action.payload]
        },
    },
})

export const selectBins = (state: RootState) => {
    return state.bins
}

export const { replace, add } = binsSlice.actions

export default binsSlice.reducer
