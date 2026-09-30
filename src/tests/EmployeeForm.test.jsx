import {
    describe,
    it,
    expect,
    vi,
  } from "vitest";
  
  import {
    render,
    screen,
  } from "@testing-library/react";
  
  import userEvent from "@testing-library/user-event";
  
  import EmployeeForm from "../components/EmployeeForm";
  
  const countries = [
    {
      id: "1",
      name: "India",
    },
    {
      id: "2",
      name: "USA",
    },
  ];
  
  const validEmployee = {
    name: "John Doe",
    email: "john@test.com",
    mobile: "9876543210",
    country: "India",
    state: "Maharashtra",
    district: "Pune",
  };
  
  describe("EmployeeForm", () => {
    it("should render add employee form", () => {
      render(
        <EmployeeForm
          countries={countries}
          onAdd={vi.fn()}
          onUpdate={vi.fn()}
          onCancel={vi.fn()}
        />
      );
  
      expect(
        screen.getByText("Add Employee")
      ).toBeInTheDocument();
  
      expect(
        screen.getByLabelText("Name")
      ).toBeInTheDocument();
  
      expect(
        screen.getByLabelText("Email")
      ).toBeInTheDocument();
    });
  
    it("should show validation errors for empty form", async () => {
      const user = userEvent.setup();
  
      render(
        <EmployeeForm
          countries={countries}
          onAdd={vi.fn()}
          onUpdate={vi.fn()}
          onCancel={vi.fn()}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Add Employee",
        })
      );
  
      expect(
        screen.getByText("Name is required")
      ).toBeInTheDocument();
  
      expect(
        screen.getByText("Email is required")
      ).toBeInTheDocument();
  
      expect(
        screen.getByText("Mobile is required")
      ).toBeInTheDocument();
    });
  
    it("should call onAdd with valid employee", async () => {
      const user = userEvent.setup();
      const onAdd = vi.fn();
  
      render(
        <EmployeeForm
          countries={countries}
          onAdd={onAdd}
          onUpdate={vi.fn()}
          onCancel={vi.fn()}
        />
      );
  
      await user.type(
        screen.getByLabelText("Name"),
        validEmployee.name
      );
  
      await user.type(
        screen.getByLabelText("Email"),
        validEmployee.email
      );
  
      await user.type(
        screen.getByLabelText("Mobile"),
        validEmployee.mobile
      );
  
      await user.click(
        screen.getByLabelText("Country")
      );
  
      await user.click(
        screen.getByRole("option", {
          name: "India",
        })
      );
  
      await user.type(
        screen.getByLabelText("State"),
        validEmployee.state
      );
  
      await user.type(
        screen.getByLabelText("District"),
        validEmployee.district
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Add Employee",
        })
      );
  
      expect(onAdd).toHaveBeenCalledWith(
        validEmployee
      );
    });
  
    it("should pre-populate form in edit mode", () => {
      const employee = {
        id: "1",
        ...validEmployee,
      };
  
      render(
        <EmployeeForm
          selectedEmployee={employee}
          countries={countries}
          onAdd={vi.fn()}
          onUpdate={vi.fn()}
          onCancel={vi.fn()}
        />
      );
  
      expect(
        screen.getByDisplayValue("John Doe")
      ).toBeInTheDocument();
  
      expect(
        screen.getByDisplayValue(
          "john@test.com"
        )
      ).toBeInTheDocument();
  
      expect(
        screen.getByText("Edit Employee")
      ).toBeInTheDocument();
    });
  
    it("should call onCancel in edit mode", async () => {
      const user = userEvent.setup();
      const onCancel = vi.fn();
  
      const employee = {
        id: "1",
        ...validEmployee,
      };
  
      render(
        <EmployeeForm
          selectedEmployee={employee}
          countries={countries}
          onAdd={vi.fn()}
          onUpdate={vi.fn()}
          onCancel={onCancel}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Cancel",
        })
      );
  
      expect(onCancel).toHaveBeenCalled();
    });
  });