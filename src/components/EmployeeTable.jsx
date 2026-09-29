import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

function EmployeeTable({
  employees = [],
  onEdit,
  onDelete,
  loading,
}) {
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleClose = () => {
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await onDelete(deleteId);
    }

    setDeleteId(null);
  };

  if (loading) {
    return (
      <Typography sx={{ mt: 2 }}>
        Loading employees...
      </Typography>
    );
  }

  if (!employees.length) {
    return (
      <Typography sx={{ mt: 2 }}>
        No employees found.
      </Typography>
    );
  }

  return (
    <>
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
              <TableCell>Actions</TableCell>
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
                    size="small"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      handleDeleteClick(employee.id)
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

      <Dialog
        open={deleteId !== null}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete Employee
        </DialogTitle>

        <DialogContent>
          Are you sure you want to delete this
          employee?
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeTable;