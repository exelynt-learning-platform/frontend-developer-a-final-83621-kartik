import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";

import employeeReducer, {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  clearSearch,
  clearError,
} from "../redux/employeeSlice";

import api from "../api/client";

vi.mock("../api/client", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("employeeSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial state", () => {
    const state = employeeReducer(undefined, {});

    expect(state.list).toEqual([]);
    expect(state.searchEmployee).toBeNull();
    expect(state.listLoading).toBe(false);
  });

  it("should clear search", () => {
    const state = employeeReducer(
      {
        list: [],
        searchEmployee: {
          id: "1",
          name: "John",
        },
        listLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        searchLoading: true,
        error: null,
        addError: null,
        updateError: null,
        deleteError: null,
        searchError: "Error",
      },
      clearSearch()
    );

    expect(state.searchEmployee).toBeNull();
    expect(state.searchError).toBeNull();
    expect(state.searchLoading).toBe(false);
  });

  it("should clear global error", () => {
    const state = employeeReducer(
      {
        list: [],
        searchEmployee: null,
        listLoading: false,
        addLoading: false,
        updateLoading: false,
        deleteLoading: false,
        searchLoading: false,
        error: "Something went wrong",
        addError: null,
        updateError: null,
        deleteError: null,
        searchError: null,
      },
      clearError()
    );

    expect(state.error).toBeNull();
  });

  it("should handle getEmployees success", async () => {
    const employees = [
      {
        id: "1",
        name: "John",
      },
      {
        id: "2",
        name: "Jane",
      },
    ];

    api.get.mockResolvedValueOnce({
      data: employees,
    });

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
    });

    await store.dispatch(getEmployees());

    const state = store.getState().employees;

    expect(state.list).toEqual(employees);
    expect(state.listLoading).toBe(false);
  });

  it("should handle getEmployees error", async () => {
    api.get.mockRejectedValueOnce(
      new Error("Network error")
    );

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
    });

    await store.dispatch(getEmployees());

    const state = store.getState().employees;

    expect(state.listLoading).toBe(false);
    expect(state.error).toBe(
      "Employee data could not be loaded"
    );
  });

  it("should search employee by id", async () => {
    const employee = {
      id: "1",
      name: "John",
    };

    api.get.mockResolvedValueOnce({
      data: employee,
    });

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
    });

    await store.dispatch(getEmployeeById("1"));

    const state = store.getState().employees;

    expect(state.searchEmployee).toEqual(
      employee
    );
    expect(state.searchLoading).toBe(false);
  });

  it("should reject invalid employee id", async () => {
    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
    });

    await store.dispatch(
      getEmployeeById("abc")
    );

    const state = store.getState().employees;

    expect(state.searchError).toBe(
      "Please enter a valid employee ID"
    );
  });

  it("should add employee", async () => {
    const employee = {
      name: "John",
      email: "john@test.com",
    };

    const responseEmployee = {
      id: "10",
      ...employee,
    };

    api.post.mockResolvedValueOnce({
      data: responseEmployee,
    });

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
    });

    await store.dispatch(
      addEmployee(employee)
    );

    const state = store.getState().employees;

    expect(state.list).toContainEqual(
      responseEmployee
    );
    expect(state.addLoading).toBe(false);
  });

  it("should update employee", async () => {
    const oldEmployee = {
      id: "1",
      name: "Old Name",
    };

    const updatedEmployee = {
      id: "1",
      name: "New Name",
    };

    api.put.mockResolvedValueOnce({
      data: updatedEmployee,
    });

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
      preloadedState: {
        employees: {
          list: [oldEmployee],
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
        },
      },
    });

    await store.dispatch(
      updateEmployee(updatedEmployee)
    );

    const state = store.getState().employees;

    expect(state.list[0]).toEqual(
      updatedEmployee
    );
    expect(state.updateLoading).toBe(false);
  });

  it("should handle update with empty API response", async () => {
    const employee = {
      id: "1",
      name: "Updated Name",
    };

    api.put.mockResolvedValueOnce({
      data: null,
    });

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
      preloadedState: {
        employees: {
          list: [
            {
              id: "1",
              name: "Old Name",
            },
          ],
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
        },
      },
    });

    await store.dispatch(
      updateEmployee(employee)
    );

    const state = store.getState().employees;

    expect(state.list[0]).toEqual(employee);
  });

  it("should delete employee", async () => {
    api.delete.mockResolvedValueOnce({});

    const store = configureStore({
      reducer: {
        employees: employeeReducer,
      },
      preloadedState: {
        employees: {
          list: [
            {
              id: "1",
              name: "John",
            },
            {
              id: "2",
              name: "Jane",
            },
          ],
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
        },
      },
    });

    await store.dispatch(
      deleteEmployee("1")
    );

    const state = store.getState().employees;

    expect(state.list).toEqual([
      {
        id: "2",
        name: "Jane",
      },
    ]);

    expect(state.deleteLoading).toBe(false);
  });
});