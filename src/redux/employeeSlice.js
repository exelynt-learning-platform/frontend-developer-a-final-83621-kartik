import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee";

// Get all employees
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// Get employee by id
export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

// Add employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const response = await axios.post(API_URL, employee);
    return response.data;
  }
);

// Update employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee) => {
    const response = await axios.put(
      `${API_URL}/${employee.id}`,
      employee
    );

    return response.data;
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",

  initialState: {
    list: [],
    searchEmployee: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSearch: (state) => {
      state.searchEmployee = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(getEmployees.rejected, (state) => {
        state.loading = false;
        state.error = "Employee data not found";
      })

      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchEmployee = null;
      })

      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.searchEmployee = action.payload;
      })

      .addCase(getEmployeeById.rejected, (state) => {
        state.loading = false;
        state.searchEmployee = null;
        state.error = "Employee not found";
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (employee) => employee.id === action.payload.id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (employee) => employee.id !== action.payload
        );
      });
  },
});

export const { clearSearch } = employeeSlice.actions;

export default employeeSlice.reducer;