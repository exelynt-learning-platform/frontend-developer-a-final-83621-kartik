import { useDispatch } from "react-redux";

import {
  deleteEmployee,
} from "../redux/employeeSlice";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function EmployeeTable({
  employees,
  setSelectedEmployee,
}) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const result = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (result) {
      dispatch(deleteEmployee(id));
    }
  };

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>State</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                {employee.id}
              </TableCell>

              <TableCell>
                {employee.name}
              </TableCell>

              <TableCell>
                {employee.email}
              </TableCell>

              <TableCell>
                {employee.mobile}
              </TableCell>

              <TableCell>
                {employee.country}
              </TableCell>

              <TableCell>
                {employee.state}
              </TableCell>

              <TableCell>
                {employee.district}
              </TableCell>

              <TableCell>
                <Button
                  onClick={() =>
                    setSelectedEmployee(
                      employee
                    )
                  }
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() =>
                    handleDelete(
                      employee.id
                    )
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;