import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
  } from "@mui/material";
  
  function SearchEmployee({
    searchId,
    setSearchId,
    onSearch,
    onClear,
    employee,
    loading,
    error,
  }) {
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (searchId.trim()) {
        onSearch(searchId.trim());
      }
    };
  
    return (
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
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
            Search
          </Button>
  
          <Button
            type="button"
            variant="outlined"
            onClick={onClear}
          >
            Clear
          </Button>
        </Box>
  
        {error && (
          <Typography
            color="error"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}
  
        {employee && (
          <Box sx={{ mt: 2 }}>
            <Typography>
              ID: {employee.id}
            </Typography>
  
            <Typography>
              Name: {employee.name}
            </Typography>
  
            <Typography>
              Email: {employee.email}
            </Typography>
  
            <Typography>
              Mobile: {employee.mobile}
            </Typography>
  
            <Typography>
              Country: {employee.country}
            </Typography>
  
            <Typography>
              State: {employee.state}
            </Typography>
  
            <Typography>
              District: {employee.district}
            </Typography>
          </Box>
        )}
      </Paper>
    );
  }
  
  export default SearchEmployee;