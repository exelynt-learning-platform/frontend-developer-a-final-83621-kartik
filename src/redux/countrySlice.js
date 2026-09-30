import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/client";

// Get all countries
export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/country");

      return Array.isArray(response.data)
        ? response.data
        : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Country data could not be loaded"
      );
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "countries",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Loading
      .addCase(
        getCountries.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Success
      .addCase(
        getCountries.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.list = Array.isArray(
            action.payload
          )
            ? action.payload
            : [];
        }
      )

      // Error
      .addCase(
        getCountries.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            "Country data could not be loaded";

          state.list = [];
        }
      );
  },
});

export default countrySlice.reducer;