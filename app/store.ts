import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productsSlice";
import { apiSlice } from "../features/api/apiSlice";
import { binsSlice } from "../features/api/binsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [binsSlice.reducerPath]: binsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(binsSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
