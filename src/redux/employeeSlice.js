import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee";

// Get all employees
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue("Employee data not found");
    }
  }
);

// Get employee by ID
export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);

      if (!response.data || !response.data.id) {
        return rejectWithValue("Employee not found");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue("Employee not found");
    }
  }
);

// Add employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, employee);

      return response.data;
    } catch (error) {
      return rejectWithValue("Employee not added");
    }
  }
);

// Update employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const { id, ...payload } = employee;

      const response = await axios.put(
        `${API_URL}/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      return rejectWithValue("Employee not updated");
    }
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue("Employee not deleted");
    }
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
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET EMPLOYEES
      // =========================

      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.list = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Employee data not found";

        state.list = [];
      })

      // =========================
      // SEARCH EMPLOYEE
      // =========================

      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchEmployee = null;
      })

      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload && action.payload.id) {
          state.searchEmployee = action.payload;
        } else {
          state.searchEmployee = null;
          state.error = "Employee not found";
        }
      })

      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.searchEmployee = null;

        state.error =
          action.payload || "Employee not found";
      })

      // =========================
      // ADD EMPLOYEE
      // =========================

      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload) {
          state.list.push(action.payload);
        }
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Employee not added";
      })

      // =========================
      // UPDATE EMPLOYEE
      // =========================

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const index = state.list.findIndex(
          (employee) =>
            String(employee.id) ===
            String(action.payload.id)
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Employee not updated";
      })

      // =========================
      // DELETE EMPLOYEE
      // =========================

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.list = state.list.filter(
          (employee) =>
            String(employee.id) !==
            String(action.payload)
        );
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Employee not deleted";
      });
  },
});

export const {
  clearSearch,
  clearError,
} = employeeSlice.actions;

export default employeeSlice.reducer;