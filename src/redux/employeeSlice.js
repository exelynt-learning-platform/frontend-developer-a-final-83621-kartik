import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee";

// Get employees
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async () => {
    const response = await axios.get(API_URL);
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

// export const addEmployee = createAsyncThunk(
//   "employees/addEmployee",
//   async (employee) => {
//     const response = await axios.get(API_URL);

//     const employees = response.data;

//     const newId = employees.length + 1;

//     const newEmployee = {
//       ...employee,
//       id: String(newId),
//     };

//     const result = await axios.post(API_URL, newEmployee);

//     return result.data;
//   }
// );


// export const addEmployee = createAsyncThunk(
//   "employees/addEmployee",
//   async (employee) => {
//     const response = await axios.get(API_URL);

//     const employees = response.data;

//     const newId = String(employees.length + 1);

//     const newEmployee = {
//       id: newId,
//       ...employee,
//     };

//     console.log("Sending:", newEmployee);

//     const result = await axios.post(API_URL, newEmployee);

//     return result.data;
//   }
// );
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
    loading: false,
    error: null,
  },

  reducers: {},

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
        state.error = "Data not load";
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

export default employeeSlice.reducer;