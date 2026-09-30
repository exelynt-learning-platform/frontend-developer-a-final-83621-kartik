import {
    describe,
    it,
    expect,
    vi,
  } from "vitest";
  
  import {
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
  
  import userEvent from "@testing-library/user-event";
  
  import EmployeeTable from "../components/EmployeeTable";
  
  const employees = [
    {
      id: "1",
      name: "John Doe",
      email: "john@test.com",
      mobile: "9876543210",
      country: "India",
      state: "Maharashtra",
      district: "Pune",
    },
  ];
  
  describe("EmployeeTable", () => {
    it("should render employees", () => {
      render(
        <EmployeeTable
          employees={employees}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );
  
      expect(
        screen.getByText("John Doe")
      ).toBeInTheDocument();
  
      expect(
        screen.getByText("john@test.com")
      ).toBeInTheDocument();
  
      expect(
        screen.getByText("Pune")
      ).toBeInTheDocument();
    });
  
    it("should call onEdit", async () => {
      const user = userEvent.setup();
      const onEdit = vi.fn();
  
      render(
        <EmployeeTable
          employees={employees}
          onEdit={onEdit}
          onDelete={vi.fn()}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Edit",
        })
      );
  
      expect(onEdit).toHaveBeenCalledWith(
        employees[0]
      );
    });
  
    it("should open delete confirmation dialog", async () => {
      const user = userEvent.setup();
  
      render(
        <EmployeeTable
          employees={employees}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Delete",
        })
      );
  
      expect(
        screen.getByText(
          "Are you sure you want to delete John Doe?"
        )
      ).toBeInTheDocument();
    });
  
    it("should call onDelete after confirmation", async () => {
      const user = userEvent.setup();
      const onDelete = vi.fn().mockResolvedValue();
  
      render(
        <EmployeeTable
          employees={employees}
          onEdit={vi.fn()}
          onDelete={onDelete}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Delete",
        })
      );
  
      const deleteButtons =
        screen.getAllByRole("button", {
          name: "Delete",
        });
  
      await user.click(
        deleteButtons[deleteButtons.length - 1]
      );
  
      expect(onDelete).toHaveBeenCalledWith(
        "1"
      );
  
      await waitFor(() => {
        expect(
          screen.queryByText(
            "Are you sure you want to delete John Doe?"
          )
        ).not.toBeInTheDocument();
      });
    });
  
    it("should keep dialog open when delete fails", async () => {
      const user = userEvent.setup();
  
      const onDelete = vi
        .fn()
        .mockRejectedValue(
          new Error("Delete failed")
        );
  
      render(
        <EmployeeTable
          employees={employees}
          onEdit={vi.fn()}
          onDelete={onDelete}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Delete",
        })
      );
  
      const deleteButtons =
        screen.getAllByRole("button", {
          name: "Delete",
        });
  
      await user.click(
        deleteButtons[deleteButtons.length - 1]
      );
  
      await waitFor(() => {
        expect(
          screen.getByText("Delete failed")
        ).toBeInTheDocument();
      });
  
      expect(
        screen.getByText(
          "Are you sure you want to delete John Doe?"
        )
      ).toBeInTheDocument();
    });
  });