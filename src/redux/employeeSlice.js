import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/client";

// Get all employees
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/employee");

      return Array.isArray(response.data)
        ? response.data
        : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Employee data could not be loaded"
      );
    }
  }
);

// Get employee by ID
export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const employeeId = String(id).trim();

      // ID should be a positive number
      if (!/^[1-9]\d*$/.test(employeeId)) {
        return rejectWithValue(
          "Please enter a valid employee ID"
        );
      }

      const response = await api.get(
        `/employee/${employeeId}`
      );

      if (!response.data || !response.data.id) {
        return rejectWithValue("Employee not found");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Employee not found"
      );
    }
  }
);

// Add employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/employee",
        employee
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Employee could not be added"
      );
    }
  }
);

// Update employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const { id, ...employeeData } = employee;

      if (!id) {
        return rejectWithValue(
          "Employee ID is required"
        );
      }

      const response = await api.put(
        `/employee/${id}`,
        employeeData
      );

      // Some APIs may return empty response
      if (response.data?.id) {
        return response.data;
      }

      return employee;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Employee could not be updated"
      );
    }
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        return rejectWithValue(
          "Employee ID is required"
        );
      }

      await api.delete(`/employee/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Employee could not be deleted"
      );
    }
  }
);

const initialState = {
  list: [],

  searchEmployee: null,

  listLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  searchLoading: false,

  error: null,
  addError: null,
  updateError: null,
  deleteError: null,
  searchError: null,
};

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    clearSearch: (state) => {
      state.searchEmployee = null;
      state.searchError = null;
      state.searchLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMutationErrors: (state) => {
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    // -----------------------------
    // Get Employees
    // -----------------------------
    builder
      .addCase(getEmployees.pending, (state) => {
        state.listLoading = true;
        state.error = null;
      })

      .addCase(
        getEmployees.fulfilled,
        (state, action) => {
          state.listLoading = false;
          state.error = null;

          state.list = Array.isArray(action.payload)
            ? action.payload
            : [];
        }
      )

      .addCase(
        getEmployees.rejected,
        (state, action) => {
          state.listLoading = false;

          state.error =
            action.payload ||
            "Unable to load employees";

          state.list = [];
        }
      );

    // -----------------------------
    // Search Employee
    // -----------------------------
    builder
      .addCase(
        getEmployeeById.pending,
        (state) => {
          state.searchLoading = true;
          state.searchError = null;
          state.searchEmployee = null;
        }
      )

      .addCase(
        getEmployeeById.fulfilled,
        (state, action) => {
          state.searchLoading = false;
          state.searchError = null;

          if (
            action.payload &&
            action.payload.id
          ) {
            state.searchEmployee =
              action.payload;
          } else {
            state.searchEmployee = null;
            state.searchError =
              "Employee not found";
          }
        }
      )

      .addCase(
        getEmployeeById.rejected,
        (state, action) => {
          state.searchLoading = false;
          state.searchEmployee = null;

          state.searchError =
            action.payload ||
            "Employee not found";
        }
      );

    // -----------------------------
    // Add Employee
    // -----------------------------
    builder
      .addCase(
        addEmployee.pending,
        (state) => {
          state.addLoading = true;
          state.addError = null;
          state.error = null;
        }
      )

      .addCase(
        addEmployee.fulfilled,
        (state, action) => {
          state.addLoading = false;
          state.addError = null;
          state.error = null;

          if (action.payload) {
            state.list.push(action.payload);
          }
        }
      )

      .addCase(
        addEmployee.rejected,
        (state, action) => {
          state.addLoading = false;

          state.addError =
            action.payload ||
            "Employee could not be added";

          state.error = state.addError;
        }
      );

    // -----------------------------
    // Update Employee
    // -----------------------------
    builder
      .addCase(
        updateEmployee.pending,
        (state) => {
          state.updateLoading = true;
          state.updateError = null;
          state.error = null;
        }
      )

      .addCase(
        updateEmployee.fulfilled,
        (state, action) => {
          state.updateLoading = false;
          state.updateError = null;
          state.error = null;

          if (
            !action.payload ||
            !action.payload.id
          ) {
            return;
          }

          const index = state.list.findIndex(
            (employee) =>
              String(employee.id) ===
              String(action.payload.id)
          );

          if (index !== -1) {
            state.list[index] =
              action.payload;
          }
        }
      )

      .addCase(
        updateEmployee.rejected,
        (state, action) => {
          state.updateLoading = false;

          state.updateError =
            action.payload ||
            "Employee could not be updated";

          state.error = state.updateError;
        }
      );

    // -----------------------------
    // Delete Employee
    // -----------------------------
    builder
      .addCase(
        deleteEmployee.pending,
        (state) => {
          state.deleteLoading = true;
          state.deleteError = null;
          state.error = null;
        }
      )

      .addCase(
        deleteEmployee.fulfilled,
        (state, action) => {
          state.deleteLoading = false;
          state.deleteError = null;
          state.error = null;

          state.list = state.list.filter(
            (employee) =>
              String(employee.id) !==
              String(action.payload)
          );
        }
      )

      .addCase(
        deleteEmployee.rejected,
        (state, action) => {
          state.deleteLoading = false;

          state.deleteError =
            action.payload ||
            "Employee could not be deleted";

          state.error = state.deleteError;
        }
      );
  },
});

export const {
  clearSearch,
  clearError,
  clearMutationErrors,
} = employeeSlice.actions;

export default employeeSlice.reducer;