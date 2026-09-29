import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getEmployeeById,
  clearSearch,
} from "../redux/employeeSlice";

import {
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";

function SearchEmployee() {
  const dispatch = useDispatch();

  const {
    searchEmployee,
    loading,
    error,
  } = useSelector(
    (state) => state.employees
  );

  const [id, setId] = useState("");

  const handleSearch = () => {
    if (!id) {
      return;
    }

    dispatch(getEmployeeById(id));
  };

  const handleClear = () => {
    setId("");
    dispatch(clearSearch());
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search Employee by ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>

        <Button
          variant="outlined"
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>

      {searchEmployee && (
        <Alert
          severity="success"
          sx={{ mt: 2 }}
        >
          Employee Found:{" "}
          {searchEmployee.name}
          {" - "}
          {searchEmployee.email}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default SearchEmployee;