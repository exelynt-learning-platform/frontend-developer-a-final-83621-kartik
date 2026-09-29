import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/client";

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/country");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Country data could not be loaded"
      );
    }
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
        state.error = null;
      })

      .addCase(getCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.list = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(getCountries.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Country data not found";
      });
  },
});

export default countrySlice.reducer;