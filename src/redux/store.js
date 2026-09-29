import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from "./employeeSlice";
import countryReducer from "./countrySlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    countries: countryReducer,
  },
});

export default store;