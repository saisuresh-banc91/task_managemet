import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

const usersUrl = 'https://jsonplaceholder.typicode.com/users'

export type UserState = {
    user: {
        domain: string
        id: number
        username: string
        website: string
        name: string
        email: string
        address: {
            address: string
            street: string
            suite: string
            city: string
            zipcode: string
        }
        phone: number
        company: { name: string; catchphrase: string; bs: string }
    }
    id: number
}

const initialState: UserState = {
    user: {
        domain: '',
        id: 0,
        username: '',
        website: '',
        name: '',
        email: '',
        address: { street: '', suite: '', city: '', zipcode: '', address: '' },
        phone: 0,
        company: { name: '', catchphrase: '', bs: '' },
    },
    id: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        replace: (state, action) => {
            state.user = action.payload
        },
        replaceId: (state, action) => {
            state.id = action.payload
        },
    },
})

export const selectUser = (state: RootState) => {
    return state.user
}

export const { replace, replaceId } = userSlice.actions

export default userSlice.reducer
