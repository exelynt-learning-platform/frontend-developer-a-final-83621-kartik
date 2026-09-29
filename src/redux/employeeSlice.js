import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/client";

const initialState = {
  list: [],
  searchEmployee: null,
  loading: false,
  error: null,
  searchLoading: false,
  searchError: null,
};

// Get all employees
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/employee");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Employee data could not be loaded"
      );
    }
  }
);

// Search employee by ID
export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/employee/${id}`);

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
      const response = await api.post("/employee", employee);
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
      const { id, ...payload } = employee;

      const response = await api.put(
        `/employee/${id}`,
        payload
      );

      return response.data;
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

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    clearSearch: (state) => {
      state.searchEmployee = null;
      state.searchError = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET EMPLOYEES
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
          action.payload || "Unable to load employees";
      })

      // SEARCH
      .addCase(getEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchEmployee = null;
      })

      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchError = null;

        if (action.payload?.id) {
          state.searchEmployee = action.payload;
        } else {
          state.searchEmployee = null;
          state.searchError = "Employee not found";
        }
      })

      .addCase(getEmployeeById.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchEmployee = null;
        state.searchError =
          action.payload || "Employee not found";
      })

      // ADD
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (action.payload) {
          state.list = [
            ...state.list,
            action.payload,
          ];
        }
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Employee could not be added";
      })

      // UPDATE
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
          action.payload ||
          "Employee could not be updated";
      })

      // DELETE
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
          action.payload ||
          "Employee could not be deleted";
      });
  },
});

export const {
  clearSearch,
  clearError,
} = employeeSlice.actions;

export default employeeSlice.reducer;