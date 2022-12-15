import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import productsReducer from '../features/products/productsSlice'
import binsReducer from '../features/bins/binsSlice'
import { apiProductsSlice } from '../features/api/apiProductsSlice'
import { apiBinsSlice } from '../features/api/apiBinsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        bins: binsReducer,
        [apiProductsSlice.reducerPath]: apiProductsSlice.reducer,
        [apiBinsSlice.reducerPath]: apiBinsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiProductsSlice.middleware)
            .concat(apiBinsSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
