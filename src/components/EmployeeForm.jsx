import { useState, useEffect } from "react";
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (selectedEmployee) {
      await dispatch(
        updateEmployee({
          id: selectedEmployee.id,
          ...form,
        })
      );

      setSelectedEmployee(null);
      setForm(initialForm);
      setErrors({});
    } else {
      await dispatch(addEmployee(form));

      setForm(initialForm);
      setErrors({});
      setSelectedEmployee(null);
    }
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