import {
  useDispatch,
  useSelector,
} from "react-redux";

import EmployeeTable from "./EmployeeTable";

import {
  deleteEmployee,
} from "../redux/employeeSlice";

function EmployeeTableContainer({
  onEdit,
}) {
  const dispatch = useDispatch();

  const {
    list,
    listLoading,
  } = useSelector(
    (state) => state.employees
  );

  const handleDelete = async (id) => {
    try {
      await dispatch(
        deleteEmployee(id)
      ).unwrap();
    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );

      // Send error back to EmployeeTable
      // so the dialog stays open.
      throw new Error(
        typeof error === "string"
          ? error
          : "Unable to delete employee"
      );
    }
  };

  return (
    <EmployeeTable
      employees={list || []}
      loading={listLoading}
      onEdit={onEdit}
      onDelete={handleDelete}
    />
  );
}

export default EmployeeTableContainer;