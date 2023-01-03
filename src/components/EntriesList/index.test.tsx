import { fireEvent, render, screen } from "@testing-library/react";
import EntriesList from "./index";
import { describe, it, expect, vi } from "vitest";

describe("EntriesList component tests", () => {
  const mockedEntries = [
    {
      id: "45658a88-6441-46b2-933a-23817d2c1fbc",
      arrival: "2022-12-05T12:00:00Z",
      owner: "Bill Thornberry",
      puppyName: "Cuddles",
      requestedService: "Grooming",
      serviced: false,
      prevEntryId: null,
      nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
    },
    {
      id: "70569642-3aca-4c9d-b72b-ca640a53e6a7",
      arrival: "2022-12-05T13:03:01Z",
      owner: "Diane de Poitiers",
      puppyName: "Marie",
      requestedService: "Exotic Hairdo",
      serviced: true,
      prevEntryId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
      nextEntryId: null,
    },
  ];
  const handleDelete = vi.fn();
  const handleChange = vi.fn();

  beforeEach(() => {
    render(
      <EntriesList
        entries={mockedEntries}
        onEntryDelete={handleDelete}
        onEntryChange={handleChange}
      />
    );
  });

  it("Renders table header information", () => {
    const owner = screen.getByRole("columnheader", { name: "Owner" });
    const puppy = screen.getByRole("columnheader", { name: "Puppy" });
    const service = screen.getByRole("columnheader", { name: "Service" });
    const arrival = screen.getByRole("columnheader", {
      name: "Time of Arrival",
    });

    expect(owner).toBeTruthy();
    expect(puppy).toBeTruthy();
    expect(service).toBeTruthy();
    expect(arrival).toBeTruthy();
  });

  it("renders two data rows", () => {
    const rows = screen.getAllByTestId("data-row");
    expect(rows.length).toBe(2);
  });

  it("Card delete button fires parent component delete method", () => {
    const deleteButton = screen.getAllByTestId("delete-button");
    expect(deleteButton).toBeTruthy();
    expect(handleDelete).toHaveBeenCalledTimes(0);

    fireEvent.click(deleteButton[0]);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it("Card serve button fires parent component change method", () => {
    const serviceButton = screen.getByRole("button", { name: "serve" });
    expect(serviceButton).toBeTruthy();

    expect(handleChange).toHaveBeenCalledTimes(0);
    fireEvent.click(serviceButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
