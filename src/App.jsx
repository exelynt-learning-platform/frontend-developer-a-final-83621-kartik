import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEmployees } from "./redux/employeeSlice";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

import {
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector(
    (state) => state.employees
  );

  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Employee Management System
      </Typography>

      <EmployeeForm
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />

      {loading && <CircularProgress />}

      {error && <p>{error}</p>}

      {!loading && list.length === 0 && (
        <p>No employees found</p>
      )}

      <EmployeeTable
        employees={list}
        setSelectedEmployee={setSelectedEmployee}
      />
    </Container>
  );
}

export default App;

// import { useDispatch,useSelector } from "react-redux";
// import { useState,useEffect } from "react";
// import { getEmployees } from "./redux/employeeSlice";
// import EmployeeForm from "./components/EmployeeForm";
// import EmployeeTable from "./components/EmployeeTable";


// function App(){
//   const dispatch=useDispatch();
//   const {list,loading,error}=useSelector(
//     (state)=>state.employees
//   )
//   const {selectedEmployee,setSelectedEmployee}=useState(null)

// useEffect(()=>{
//   dispatch(getEmployees());
// })

//    return(
//        <>
//        <h1>Employee Mangement System</h1>
//        <EmployeeForm 
//        selectedEmployee={selectedEmployee}
//        setSelectedEmployee={setSelectedEmployee}
//        />
//        <EmployeeTable employees={list}
//           setSelectedEmployee={setSelectedEmployee}      
//        />
//        </>
//    )
// }
//  export default App