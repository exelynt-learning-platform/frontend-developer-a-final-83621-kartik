import { useDispatch, useSelector } from "react-redux";

import EmployeeForm from "./EmployeeForm";

import {
  addEmployee,
  updateEmployee,
} from "../redux/employeeSlice";

function EmployeeFormContainer({
  selectedEmployee,
  onCancel,
  onSuccess,
}) {
  const dispatch = useDispatch();

  const {
    addLoading,
    updateLoading,
  } = useSelector((state) => state.employees);

  const {
    list: countries = [],
    loading: countryLoading,
    error: countryError,
  } = useSelector((state) => state.countries);

  const loading =
    addLoading || updateLoading;

  const handleAdd = async (employee) => {
    await dispatch(
      addEmployee(employee)
    ).unwrap();

    onSuccess();
  };

  const handleUpdate = async (employee) => {
    await dispatch(
      updateEmployee(employee)
    ).unwrap();

    onSuccess();
  };

  return (
    <EmployeeForm
      selectedEmployee={selectedEmployee}
      countries={countries}
      countryLoading={countryLoading}
      countryError={countryError}
      loading={loading}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onCancel={onCancel}
    />
  );
}

export default EmployeeFormContainer;