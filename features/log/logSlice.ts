import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: { isLoggedIn: boolean } = { isLoggedIn: false }

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.isLoggedIn = false
        },
    },
})

export const selectLog = (state: RootState) => {
    return state.log
}

export const { login, logout } = logSlice.actions

export default logSlice.reducer
