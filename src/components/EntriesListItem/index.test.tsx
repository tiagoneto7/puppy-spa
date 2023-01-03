import { fireEvent, render, screen } from "@testing-library/react";
import EntriesListItem from "./index";
import { describe, it, expect, vi } from "vitest";

describe("EntriesListItem component tests", () => {
  const mockedEntry = {
    id: "45658a88-6441-46b2-933a-23817d2c1fbc",
    arrival: "2022-12-05T12:00:00Z",
    owner: "Bill Thornberry",
    puppyName: "Cuddles",
    requestedService: "Grooming",
    serviced: false,
    prevEntryId: null,
    nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
  };
  const handleDelete = vi.fn();
  const handleChange = vi.fn();

  beforeEach(() => {
    render(
      <EntriesListItem
        entry={mockedEntry}
        onDelete={handleDelete}
        onEntryChange={handleChange}
      />
    );
  });

  it("Entry card renders correct information", () => {
    const owner = screen.getByText("Bill Thornberry");
    const puppy = screen.getByText("Cuddles");
    const service = screen.getByText("Grooming");
    const arrival = screen.getByText("12:00");
    const serviceButton = screen.getByText("serve");

    expect(owner).toBeTruthy();
    expect(puppy).toBeTruthy();
    expect(service).toBeTruthy();
    expect(arrival).toBeTruthy();
    expect(serviceButton).toBeTruthy();
  });

  it("Delete button fires delete method", () => {
    const deleteButton = screen.getByRole("button", { name: "" });
    expect(deleteButton).toBeTruthy();
    expect(handleDelete).toHaveBeenCalledTimes(0);

    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("When service is falsy, service button fires change method", () => {
    const serviceButton = screen.getByRole("button", { name: "serve" });
    expect(serviceButton).toBeTruthy();

    expect(handleChange).toHaveBeenCalledTimes(0);
    fireEvent.click(serviceButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("When service is true, serviced button fires change method", () => {
    const mockedEntry = {
      id: "45658a88-6441-46b2-933a-23817d2c1fbc",
      arrival: "2022-12-05T12:00:00Z",
      owner: "Bill Thornberry",
      puppyName: "Cuddles",
      requestedService: "Grooming",
      serviced: true,
      prevEntryId: null,
      nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
    };

    render(
      <EntriesListItem
        entry={mockedEntry}
        onDelete={handleDelete}
        onEntryChange={handleChange}
      />
    );

    const servicedButton = screen.getByRole("button", { name: "serviced" });
    expect(servicedButton).toBeTruthy();

    expect(handleChange).toHaveBeenCalledTimes(1);
    fireEvent.click(servicedButton);
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});
