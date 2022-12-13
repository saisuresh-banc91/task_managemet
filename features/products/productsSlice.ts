import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export const productsSlice = createSlice({
    name: 'products',
    initialState: { products: [] },
    reducers: {
        replace: (state, action) => {
            state.products = action.payload
        },
    },
})

export const selectProducts = (state: RootState) => {
    return state.products
}

export const { replace } = productsSlice.actions

export default productsSlice.reducer
