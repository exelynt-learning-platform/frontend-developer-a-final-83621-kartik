import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Container,
  Typography,
  Box,
} from "@mui/material";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeTableContainer from "./components/EmployeeTableContainer";
import SearchEmployeeContainer from "./components/SearchEmployeeContainer";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  clearError,
} from "./redux/employeeSlice";

import { getCountries } from "./redux/countrySlice";

function App() {
  const dispatch = useDispatch();

  const {
    list,
    loading,
    error,
  } = useSelector(
    (state) => state.employees
  );

  const {
    list: countries,
  } = useSelector(
    (state) => state.countries
  );

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getCountries());
  }, [dispatch]);

  const handleAdd = async (employee) => {
    await dispatch(addEmployee(employee)).unwrap();
  };

  const handleUpdate = async (employee) => {
    await dispatch(updateEmployee(employee)).unwrap();

    setSelectedEmployee(null);
  };

  const handleEdit = (employee) => {
    dispatch(clearError());
    setSelectedEmployee(employee);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Employee Management
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() =>
            dispatch(clearError())
          }
        >
          {error}
        </Alert>
      )}

      <SearchEmployeeContainer />

      <EmployeeForm
        selectedEmployee={selectedEmployee}
        countries={countries || []}
        loading={loading}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />

      <Box sx={{ mt: 3 }}>
        <EmployeeTableContainer
          onEdit={handleEdit}
        />
      </Box>
    </Container>
  );
}

export default App;