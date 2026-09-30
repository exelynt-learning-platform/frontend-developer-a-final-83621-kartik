import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
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
  countries = [],
  countryLoading = false,
  countryError = "",
  loading = false,
  onAdd,
  onUpdate,
  onCancel,
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // Fill form when editing an employee
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

    const name = form.name.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();
    const country = form.country.trim();
    const state = form.state.trim();
    const district = form.district.trim();

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.length < 2 || name.length > 50) {
      newErrors.name =
        "Name must be between 2 and 50 characters";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (email.length > 100) {
      newErrors.email =
        "Email must not exceed 100 characters";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Mobile validation
    if (!mobile) {
      newErrors.mobile = "Mobile is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile =
        "Mobile must contain exactly 10 digits";
    }

    // Country validation
    if (!country) {
      newErrors.country = "Country is required";
    }

    // State validation
    if (!state) {
      newErrors.state = "State is required";
    } else if (state.length < 2 || state.length > 50) {
      newErrors.state =
        "State must be between 2 and 50 characters";
    }

    // District validation
    if (!district) {
      newErrors.district = "District is required";
    } else if (
      district.length < 2 ||
      district.length > 50
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

    const employeeData = {
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      country: form.country.trim(),
      state: form.state.trim(),
      district: form.district.trim(),
    };

    try {
      if (selectedEmployee) {
        await onUpdate({
          id: selectedEmployee.id,
          ...employeeData,
        });

        // Parent clears selectedEmployee after successful update.
        // The useEffect above then resets the form.
      } else {
        await onAdd(employeeData);

        setForm(initialForm);
      }

      setErrors({});
    } catch (error) {
      console.error(
        "Employee save failed:",
        error
      );
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
        noValidate
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
          inputProps={{
            maxLength: 50,
          }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
          inputProps={{
            maxLength: 100,
          }}
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
          inputProps={{
            maxLength: 10,
          }}
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
            errors.country ||
            (countryLoading
              ? "Loading countries..."
              : "Select country")
          }
          margin="normal"
          disabled={countryLoading}
        >
          {countries.length > 0 ? (
            countries.map((country) => {
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
            })
          ) : (
            <MenuItem disabled>
              No countries available
            </MenuItem>
          )}
        </TextField>

        {countryError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {countryError}
          </Alert>
        )}

        <TextField
          fullWidth
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          error={Boolean(errors.state)}
          helperText={errors.state}
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
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
          inputProps={{
            maxLength: 50,
          }}
        />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
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