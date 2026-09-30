import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
  } from "vitest";
  
  import { configureStore } from "@reduxjs/toolkit";
  
  import countryReducer, {
    getCountries,
  } from "../redux/countrySlice";
  
  import api from "../api/client";
  
  vi.mock("../api/client", () => ({
    default: {
      get: vi.fn(),
    },
  }));
  
  describe("countrySlice", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it("should return initial state", () => {
      const state = countryReducer(
        undefined,
        {}
      );
  
      expect(state.list).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  
    it("should get countries successfully", async () => {
      const countries = [
        {
          id: "1",
          name: "India",
        },
        {
          id: "2",
          name: "USA",
        },
      ];
  
      api.get.mockResolvedValueOnce({
        data: countries,
      });
  
      const store = configureStore({
        reducer: {
          countries: countryReducer,
        },
      });
  
      await store.dispatch(getCountries());
  
      const state =
        store.getState().countries;
  
      expect(state.list).toEqual(countries);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  
    it("should handle country API error", async () => {
      api.get.mockRejectedValueOnce(
        new Error("Network error")
      );
  
      const store = configureStore({
        reducer: {
          countries: countryReducer,
        },
      });
  
      await store.dispatch(getCountries());
  
      const state =
        store.getState().countries;
  
      expect(state.loading).toBe(false);
      expect(state.error).toBe(
        "Country data could not be loaded"
      );
    });
  });