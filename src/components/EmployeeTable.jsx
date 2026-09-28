
import { useDispatch } from "react-redux";

import { deleteEmployee } from "../redux/employeeSlice";

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

function EmployeeTable({ employees, setSelectedEmployee }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const result = window.confirm(
      "तुम्हाला employee delete करायचा आहे का?"
    );

    if (result) {
      dispatch(deleteEmployee(id));
    }
  };

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
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={employee.id}>
              {/* Serial number */}
              <TableCell>{index + 1}</TableCell>

              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.mobile}</TableCell>
              <TableCell>{employee.country}</TableCell>

              <TableCell>
                <Button
                  onClick={() => setSelectedEmployee(employee)}
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() => handleDelete(employee.id)}
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

