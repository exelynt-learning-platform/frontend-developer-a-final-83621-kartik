import { useDispatch, useSelector } from "react-redux";

import {
  deleteEmployee,
} from "../redux/employeeSlice";

import EmployeeTable from "./EmployeeTable";

function EmployeeTableContainer({ onEdit }) {
  const dispatch = useDispatch();

  const {
    list,
    loading,
  } = useSelector(
    (state) => state.employees
  );

  const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id)).unwrap();
  };

  return (
    <EmployeeTable
      employees={list || []}
      loading={loading}
      onEdit={onEdit}
      onDelete={handleDelete}
    />
  );
}

export default EmployeeTableContainer;