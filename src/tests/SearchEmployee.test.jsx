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
  
  import SearchEmployee from "../components/SearchEmployee";
  
  describe("SearchEmployee", () => {
    it("should render search form", () => {
      render(
        <SearchEmployee
          searchId=""
          setSearchId={vi.fn()}
          onSearch={vi.fn()}
          onClear={vi.fn()}
        />
      );
  
      expect(
        screen.getByText("Search Employee")
      ).toBeInTheDocument();
  
      expect(
        screen.getByLabelText("Employee ID")
      ).toBeInTheDocument();
    });
  
    it("should call onSearch", async () => {
      const user = userEvent.setup();
      const onSearch = vi.fn();
  
      render(
        <SearchEmployee
          searchId="1"
          setSearchId={vi.fn()}
          onSearch={onSearch}
          onClear={vi.fn()}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Search",
        })
      );
  
      expect(onSearch).toHaveBeenCalledWith(
        "1"
      );
    });
  
    it("should show employee details", () => {
      const employee = {
        id: "1",
        name: "John Doe",
        email: "john@test.com",
        mobile: "9876543210",
        country: "India",
        state: "Maharashtra",
        district: "Pune",
      };
  
      render(
        <SearchEmployee
          searchId="1"
          setSearchId={vi.fn()}
          onSearch={vi.fn()}
          onClear={vi.fn()}
          employee={employee}
        />
      );
  
      expect(
        screen.getByText("John Doe")
      ).toBeInTheDocument();
  
      expect(
        screen.getByText("Pune")
      ).toBeInTheDocument();
    });
  
    it("should show not found message", () => {
      render(
        <SearchEmployee
          searchId="999"
          setSearchId={vi.fn()}
          onSearch={vi.fn()}
          onClear={vi.fn()}
          notFound
          error="Employee not found"
        />
      );
  
      expect(
        screen.getByText(
          "No employee found with this ID."
        )
      ).toBeInTheDocument();
    });
  
    it("should call onClear", async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
  
      render(
        <SearchEmployee
          searchId="1"
          setSearchId={vi.fn()}
          onSearch={vi.fn()}
          onClear={onClear}
        />
      );
  
      await user.click(
        screen.getByRole("button", {
          name: "Clear",
        })
      );
  
      expect(onClear).toHaveBeenCalled();
    });
  });