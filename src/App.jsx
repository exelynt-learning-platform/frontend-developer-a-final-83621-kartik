import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { getEmployees } from "./redux/employeeSlice";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import SearchEmployee from "./components/SerchEmployee";

import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const {
    list,
    loading,
    error,
  } = useSelector(
    (state) => state.employees
  );

  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Employee Management
      </Typography>

      <SearchEmployee />

      <EmployeeForm
        selectedEmployee={
          selectedEmployee
        }
        setSelectedEmployee={
          setSelectedEmployee
        }
      />

      {loading && (
        <Box sx={{ mb: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      {!loading && (
        <EmployeeTable
          employees={list}
          setSelectedEmployee={
            setSelectedEmployee
          }
        />
      )}
    </Container>
  );
}

export default App;