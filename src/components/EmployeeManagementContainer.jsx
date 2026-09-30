import {
    useEffect,
    useState,
  } from "react";
  
  import {
    useDispatch,
    useSelector,
  } from "react-redux";
  
  import {
    Alert,
    Box,
  } from "@mui/material";
  
  import EmployeeFormContainer from "./EmployeeFormContainer";
  import EmployeeTableContainer from "./EmployeeTableContainer";
  import SearchEmployeeContainer from "./SearchEmployeeContainer";
  
  import {
    getEmployees,
    clearError,
  } from "../redux/employeeSlice";
  
  import {
    getCountries,
  } from "../redux/countrySlice";
  
  function EmployeeManagementContainer() {
    const dispatch = useDispatch();
  
    const [selectedEmployee, setSelectedEmployee] =
      useState(null);
  
    const {
      error,
    } = useSelector(
      (state) => state.employees
    );
  
    // Load employees and countries
    useEffect(() => {
      dispatch(getEmployees());
      dispatch(getCountries());
    }, [dispatch]);
  
    const handleEdit = (employee) => {
      dispatch(clearError());
      setSelectedEmployee(employee);
    };
  
    const handleCancel = () => {
      setSelectedEmployee(null);
    };
  
    // Called only after successful add/update
    const handleFormSuccess = () => {
      setSelectedEmployee(null);
    };
  
    return (
      <>
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
  
        <EmployeeFormContainer
          selectedEmployee={selectedEmployee}
          onCancel={handleCancel}
          onSuccess={handleFormSuccess}
        />
  
        <Box sx={{ mt: 3 }}>
          <EmployeeTableContainer
            onEdit={handleEdit}
          />
        </Box>
      </>
    );
  }
  
  export default EmployeeManagementContainer;