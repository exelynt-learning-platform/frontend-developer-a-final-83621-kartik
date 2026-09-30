import { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import SearchEmployee from "./SearchEmployee";

import {
  getEmployeeById,
  clearSearch,
} from "../redux/employeeSlice";

function SearchEmployeeContainer() {
  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState("");
  const [validationError, setValidationError] =
    useState("");

  const {
    searchEmployee,
    searchLoading,
    searchError,
  } = useSelector(
    (state) => state.employees
  );

  const handleSearch = (id) => {
    const value = String(id).trim();

    if (!/^[1-9]\d*$/.test(value)) {
      setValidationError(
        "Please enter a valid employee ID"
      );

      dispatch(clearSearch());
      return;
    }

    setValidationError("");
    dispatch(getEmployeeById(value));
  };

  const handleClear = () => {
    setSearchId("");
    setValidationError("");
    dispatch(clearSearch());
  };

  const error =
    validationError || searchError;

  const notFound =
    searchError === "Employee not found";

  return (
    <SearchEmployee
      searchId={searchId}
      setSearchId={setSearchId}
      onSearch={handleSearch}
      onClear={handleClear}
      employee={searchEmployee}
      loading={searchLoading}
      error={error}
      notFound={notFound}
    />
  );
}

export default SearchEmployeeContainer;