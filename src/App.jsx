import {
  Container,
  Typography,
} from "@mui/material";

import EmployeeManagementContainer from "./components/EmployeeManagementContainer";

function App() {
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

      <EmployeeManagementContainer />
    </Container>
  );
}

export default App;