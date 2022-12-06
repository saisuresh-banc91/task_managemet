import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const usersUrl = "https://jsonplaceholder.typicode.com/users";

export type UserState = {
  user: {
    id: number;
    username: string;
    website: string;
    name: string;
    email: string;
    address: { street: string; suite: string; city: string; zipcode: string };
    phone: number;
    company: { name: string; catchphrase: string; bs: string };
  };
  loader: boolean;
  error: boolean;
};

const initialState: UserState = {
  user: {
    id: 0,
    username: "",
    website: "",
    name: "",
    email: "",
    address: { street: "", suite: "", city: "", zipcode: "" },
    phone: 0,
    company: { name: "", catchphrase: "", bs: "" },
  },
  loader: false,
  error: false,
};

export const fetchUserById = createAsyncThunk(
  "user/fetchUser",
  async (userid: string) => {
    try {
      const response = await axios.get(usersUrl + "/" + userid);
      delete response.data.address.geo;
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return String(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loader = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loader = false;
        state.error = true;
      });
  },
});

export const selectUser = (state: RootState) => {
  return state.user;
};

export default userSlice.reducer;
