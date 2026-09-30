import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function EmployeeTable({
  employees = [],
  onEdit,
  onDelete,
  loading = false,
}) {
  const [deleteEmployee, setDeleteEmployee] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  const handleDeleteClick = (employee) => {
    setDeleteEmployee(employee);
    setDeleteError("");
  };

  const handleClose = () => {
    if (!deleteLoading) {
      setDeleteEmployee(null);
      setDeleteError("");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteEmployee) {
      return;
    }

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await onDelete(deleteEmployee.id);

      // Close dialog only after successful delete
      setDeleteEmployee(null);
    } catch (error) {
      console.error(
        "Delete employee failed:",
        error
      );

      setDeleteError(
        error?.message ||
          "Unable to delete employee. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Typography sx={{ mt: 2 }}>
        Loading employees...
      </Typography>
    );
  }

  if (!employees || employees.length === 0) {
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
                    onClick={() =>
                      onEdit(employee)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      handleDeleteClick(employee)
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
        open={deleteEmployee !== null}
        onClose={handleClose}
      >
        <DialogTitle>
          Delete Employee
        </DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>
              {deleteEmployee?.name}
            </strong>
            ?
          </Typography>

          {deleteError && (
            <Alert
              severity="error"
              sx={{ mt: 2 }}
            >
              {deleteError}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={deleteLoading}
          >
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleteLoading}
          >
            {deleteLoading
              ? "Deleting..."
              : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EmployeeTable;