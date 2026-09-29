import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: "",
};

function EmployeeForm({
  selectedEmployee,
  countries,
  loading,
  onAdd,
  onUpdate,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        name: selectedEmployee.name || "",
        email: selectedEmployee.email || "",
        mobile: selectedEmployee.mobile || "",
        country: selectedEmployee.country || "",
        state: selectedEmployee.state || "",
        district: selectedEmployee.district || "",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [selectedEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (
      form.name.trim().length < 2 ||
      form.name.trim().length > 50
    ) {
      newErrors.name =
        "Name must be between 2 and 50 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile =
        "Mobile must contain 10 digits";
    }

    if (!form.country) {
      newErrors.country = "Country is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    } else if (
      form.state.trim().length < 2 ||
      form.state.trim().length > 50
    ) {
      newErrors.state =
        "State must be between 2 and 50 characters";
    }

    if (!form.district.trim()) {
      newErrors.district = "District is required";
    } else if (
      form.district.trim().length < 2 ||
      form.district.trim().length > 50
    ) {
      newErrors.district =
        "District must be between 2 and 50 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      if (selectedEmployee) {
        await onUpdate({
          id: selectedEmployee.id,
          ...form,
        });
      } else {
        await onAdd(form);
      }

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      // Redux handles the error
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    onCancel();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {selectedEmployee
          ? "Edit Employee"
          : "Add Employee"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          error={Boolean(errors.mobile)}
          helperText={errors.mobile}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          error={Boolean(errors.country)}
          helperText={
            errors.country || "Select country"
          }
          margin="normal"
        >
          {countries.map((country) => {
            const countryName =
              country.name ||
              country.country ||
              "";

            return (
              <MenuItem
                key={country.id || countryName}
                value={countryName}
              >
                {countryName}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          fullWidth
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          error={Boolean(errors.state)}
          helperText={errors.state}
          margin="normal"
        />

        <TextField
          fullWidth
          label="District"
          name="district"
          value={form.district}
          onChange={handleChange}
          error={Boolean(errors.district)}
          helperText={errors.district}
          margin="normal"
        />

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mr: 1 }}
          >
            {loading
              ? "Saving..."
              : selectedEmployee
              ? "Update Employee"
              : "Add Employee"}
          </Button>

          {selectedEmployee && (
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default EmployeeForm;