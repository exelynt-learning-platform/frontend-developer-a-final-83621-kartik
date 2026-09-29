import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country";

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const countrySlice = createSlice({
  name: "countries",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getCountries.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(getCountries.rejected, (state) => {
        state.loading = false;
        state.error = "Country data not found";
      });
  },
});

export default countrySlice.reducer;