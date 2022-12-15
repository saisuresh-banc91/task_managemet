import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
const initial: { products: Object[] } = { products: [] }

export const productsSlice = createSlice({
    name: 'products',
    initialState: initial,
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
