import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { TextField } from "@mui/material";

function SearchEmployee({
  searchId,
  setSearchId,
  onSearch,
  onClear,
  employee,
  loading = false,
  error = "",
  notFound = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchId.trim()) {
      onSearch(searchId.trim());
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Search Employee
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Employee ID"
          value={searchId}
          onChange={(event) =>
            setSearchId(event.target.value)
          }
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Searching..."
            : "Search"}
        </Button>

        <Button
          type="button"
          variant="outlined"
          onClick={onClear}
          disabled={loading}
        >
          Clear
        </Button>
      </Box>

      {/* Validation / API error */}
      {error && !notFound && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
        >
          {error}
        </Alert>
      )}

      {/* Employee not found */}
      {notFound && (
        <Alert
          severity="info"
          sx={{ mt: 2 }}
        >
          No employee found with this ID.
        </Alert>
      )}

      {/* Search result */}
      {employee && !loading && (
        <Paper
          variant="outlined"
          sx={{ mt: 3, p: 2 }}
        >
          <Typography
            variant="subtitle1"
            sx={{ mb: 1 }}
          >
            Employee Details
          </Typography>

          <Typography>
            <strong>ID:</strong>{" "}
            {employee.id}
          </Typography>

          <Typography>
            <strong>Name:</strong>{" "}
            {employee.name}
          </Typography>

          <Typography>
            <strong>Email:</strong>{" "}
            {employee.email}
          </Typography>

          <Typography>
            <strong>Mobile:</strong>{" "}
            {employee.mobile}
          </Typography>

          <Typography>
            <strong>Country:</strong>{" "}
            {employee.country}
          </Typography>

          <Typography>
            <strong>State:</strong>{" "}
            {employee.state}
          </Typography>

          <Typography>
            <strong>District:</strong>{" "}
            {employee.district}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
}

export default SearchEmployee;