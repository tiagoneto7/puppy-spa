import { fireEvent, render, screen } from "@testing-library/react";
import Waitlist from "./index";
import { describe, it, expect, vi } from "vitest";

describe("Waitlist component tests", () => {
  let tableRows;

  beforeEach(() => {
    render(<Waitlist />);

    tableRows = screen.getAllByTestId("data-row");
  });

  it("Renders header inputs and filters correctly", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    const datePicker = screen.getByDisplayValue("2022-12-05");
    const searchInput = screen.getByPlaceholderText("Search");
    const sortedByLabel = screen.getByText("Sorted by");
    const SortByComboBox = screen.getByTestId("select");

    expect(checkboxes.length).toBe(2);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();

    expect(datePicker).toHaveValue("2022-12-05");
    expect(searchInput).toHaveValue("");
    expect(sortedByLabel).toBeTruthy();
    expect(SortByComboBox).toHaveValue("identifier");
  });

  it("checkbox click changes entries list length", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    expect(tableRows.length).toBe(4);

    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

    tableRows = screen.getAllByTestId("data-row");
    expect(tableRows.length).toBe(3);

    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(2);
  });

  it("Date picker change shows no results label", () => {
    const datePicker = screen.getByDisplayValue("2022-12-05");

    fireEvent.change(datePicker, { target: { value: "2023-01-28" } });
    const noResultsLabel = screen.getByText("No results");

    expect(noResultsLabel).toBeTruthy();
  });

  it("Input search changes entries list length", () => {
    expect(tableRows.length).toBe(4);

    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Fluffy" } });

    tableRows = screen.getAllByTestId("data-row");
    expect(tableRows.length).toBe(1);

    fireEvent.change(searchInput, { target: { value: "this is a test" } });

    const noResultsLabel = screen.getByText("No results");
    expect(noResultsLabel).toBeTruthy();
  });

  it("List is correctly ordered", () => {
    const SortByComboBox = screen.getByTestId("select");
    expect(SortByComboBox).toHaveValue("identifier");

    let tableCells = screen.getAllByRole("cell");
    expect(tableCells[0].innerHTML).toBe("<p>Diane de Poitiers</p>");
  });

  it("Delete entry changes entries list length", () => {
    expect(tableRows.length).toBe(4);
    let tableCells = screen.getAllByRole("cell");
    expect(tableCells[0].innerHTML).toBe("<p>Diane de Poitiers</p>");

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    tableRows = screen.getAllByTestId("data-row");
    tableCells = screen.getAllByRole("cell");
    expect(tableRows.length).toBe(3);
    expect(tableCells[0].innerHTML).toBe("<p>Jill Doe</p>");
  });

  it("Modal opens", () => {
    const addButton = screen.getByTestId("open-modal-button");
    fireEvent.click(addButton);

    const formTitle = screen.getByText("New service");
    expect(formTitle).toBeTruthy();
  });

  it("Adding new entry threw modal changes view to a new waitlist", () => {
    expect(tableRows.length).toBe(3);
    const addButton = screen.getByTestId("open-modal-button");
    fireEvent.click(addButton);

    const submitButton = screen.getByRole("button", { name: "add service" });
    const ownerInput = screen.getByTestId("owner-input");
    const puppyInput = screen.getByTestId("puppy-input");
    const serviceInput = screen.getByTestId("requested-service-input");
    fireEvent.change(ownerInput, { target: { value: "Bill" } });
    fireEvent.change(puppyInput, { target: { value: "Mike" } });
    fireEvent.change(serviceInput, { target: { value: "Nails" } });

    fireEvent.click(submitButton);

    tableRows = screen.getAllByTestId("data-row");
    expect(tableRows.length).toBe(1);

    const tableCells = screen.getAllByRole("cell");
    expect(tableCells[0].innerHTML).toBe("<p>Bill</p>");

    const datePicker = screen.getByDisplayValue(
      new Date().toISOString().substring(0, 10)
    );
    expect(datePicker).toBeTruthy();
  });
});
