import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getEmployeeById,
  clearSearch,
} from "../redux/employeeSlice";

import SearchEmployee from "./SearchEmployee";

function SearchEmployeeContainer() {
  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState("");

  const {
    searchEmployee,
    searchLoading,
    searchError,
  } = useSelector(
    (state) => state.employees
  );

  const handleSearch = (id) => {
    dispatch(getEmployeeById(id));
  };

  const handleClear = () => {
    setSearchId("");
    dispatch(clearSearch());
  };

  return (
    <SearchEmployee
      searchId={searchId}
      setSearchId={setSearchId}
      onSearch={handleSearch}
      onClear={handleClear}
      employee={searchEmployee}
      loading={searchLoading}
      error={searchError}
    />
  );
}

export default SearchEmployeeContainer;