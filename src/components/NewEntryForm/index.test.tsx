import { fireEvent, render, screen } from "@testing-library/react";
import NewEntryForm from "./index";
import { describe, it, expect, vi } from "vitest";

describe("NewEntryForm component tests", () => {
  const handleNewEntry = vi.fn();

  beforeEach(() => {
    render(<NewEntryForm onAddNewEntry={handleNewEntry} />);
  });

  it("Renders correct labels and title", () => {
    const formTitle = screen.getByText("New service");
    const owner = screen.getByText("Owner");
    const puppy = screen.getByText("Puppy Name");
    const service = screen.getByText("Requested Service");
    const date = screen.getByText(new Date().toLocaleDateString());

    expect(formTitle).toBeTruthy();
    expect(owner).toBeTruthy();
    expect(puppy).toBeTruthy();
    expect(service).toBeTruthy();
    expect(date).toBeTruthy();
  });

  it("inputs are empty", () => {
    const inputs = screen.getAllByRole("textbox", { name: "" });
    expect(inputs.length).toBe(3);

    const ownerInput = inputs[0];
    const puppyInput = inputs[1];
    const serviceInput = inputs[2];

    expect(ownerInput).toHaveValue("");
    expect(puppyInput).toHaveValue("");
    expect(serviceInput).toHaveValue("");
  });

  it("submit button fails click because of empty inputs", () => {
    const submitButton = screen.getByRole("button", { name: "add service" });
    expect(submitButton).toBeDisabled();

    expect(handleNewEntry).toHaveBeenCalledTimes(0);

    fireEvent.click(submitButton);
    expect(handleNewEntry).toHaveBeenCalledTimes(0);
  });

  it("filled inputs allow submit button click to fire newEntry method", () => {
    const submitButton = screen.getByRole("button", { name: "add service" });
    expect(handleNewEntry).toHaveBeenCalledTimes(0);

    const ownerInput = screen.getByTestId("owner-input");
    const puppyInput = screen.getByTestId("puppy-input");
    const serviceInput = screen.getByTestId("requested-service-input");

    fireEvent.change(ownerInput, { target: { value: "Bill" } });
    fireEvent.change(puppyInput, { target: { value: "Mike" } });
    fireEvent.change(serviceInput, { target: { value: "Nails" } });

    expect(ownerInput).toHaveValue("Bill");
    expect(puppyInput).toHaveValue("Mike");
    expect(serviceInput).toHaveValue("Nails");

    fireEvent.click(submitButton);
    expect(handleNewEntry).toHaveBeenCalledTimes(1);
  });
});
