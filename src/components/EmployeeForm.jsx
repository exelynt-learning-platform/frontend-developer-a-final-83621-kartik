import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addEmployee,
  updateEmployee,
} from "../redux/employeeSlice";

import {
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useEffect } from "react";

function EmployeeForm({ selectedEmployee, setSelectedEmployee }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
  });
  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        name: selectedEmployee.name || "",
        email: selectedEmployee.email || "",
        mobile: selectedEmployee.mobile || "",
        country: selectedEmployee.country || "",
      });
    }
  }, [selectedEmployee]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedEmployee) {
      dispatch(
        updateEmployee({
          id: selectedEmployee.id,
          ...form,
        })
      );

      setSelectedEmployee(null);
    } else {
      dispatch(addEmployee(form));
    }

    setForm({
      name: "",
      email: "",
      mobile: "",
      country: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <TextField
        label="Mobile"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <TextField
        label="Country"
        name="country"
        value={form.country}
        onChange={handleChange}
        required
      />

      <Button
        type="submit"
        variant="contained"
      >
        {selectedEmployee ? "Update" : "Add"}
      </Button>
    </Box>
  );
}

export default EmployeeForm;