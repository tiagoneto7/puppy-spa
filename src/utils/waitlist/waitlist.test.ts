import { describe, it, expect } from "vitest";
import { Entry } from "../../components/EntriesListItem";
import Waitlist from "../../components/Waitlist";
import {
  addEntry,
  changeEntry,
  deleteEntry,
  findWaitListByDate,
} from "./waitlist";

describe("waitlists tests", () => {
  const mockedWaitlists: Waitlist[] = [
    {
      date: "2022-12-05",
      entries: [
        {
          id: "45658a88-6441-46b2-933a-23817d2c1fbc",
          arrival: "2022-12-05T12:00:00Z",
          owner: "Bill Thornberry",
          puppyName: "Cuddles",
          requestedService: "Grooming",
          serviced: true,
          prevEntryId: null,
          nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        },
        {
          id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
          arrival: "2022-12-05T12:01:40Z",
          owner: "Bob Hope",
          puppyName: "Paws",
          requestedService: "Nail Clipping",
          serviced: false,
          prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
          nextEntryId: null,
        },
      ],
    },
  ];

  it("returns correct waitlist if searched date already exists", () => {
    const foundWaitlist = {
      date: "2022-12-05",
      entries: [
        {
          id: "45658a88-6441-46b2-933a-23817d2c1fbc",
          arrival: "2022-12-05T12:00:00Z",
          owner: "Bill Thornberry",
          puppyName: "Cuddles",
          requestedService: "Grooming",
          serviced: true,
          prevEntryId: null,
          nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        },
        {
          id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
          arrival: "2022-12-05T12:01:40Z",
          owner: "Bob Hope",
          puppyName: "Paws",
          requestedService: "Nail Clipping",
          serviced: false,
          prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
          nextEntryId: null,
        },
      ],
    };

    expect(findWaitListByDate("2022-12-05", mockedWaitlists)).toEqual(
      foundWaitlist
    );
  });

  it("returns undefined if searched date does not exist", () => {
    expect(findWaitListByDate("2023-05-03", mockedWaitlists)).toBeUndefined();
  });

  it("returns ordered array of entries including the added one", () => {
    const entryToAdd = {
      id: "testid",
      arrival: "2022-12-05T15:01:40Z",
      owner: "Joe",
      puppyName: "Brutus",
      requestedService: "Hair Cut",
      serviced: false,
      prevEntryId: null,
      nextEntryId: null,
    };
    const expectedEntries: Entry[] = [
      {
        id: "testid",
        arrival: "2022-12-05T15:01:40Z",
        owner: "Joe",
        puppyName: "Brutus",
        requestedService: "Hair Cut",
        serviced: false,
        prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        nextEntryId: null,
      },
      {
        id: "45658a88-6441-46b2-933a-23817d2c1fbc",
        arrival: "2022-12-05T12:00:00Z",
        owner: "Bill Thornberry",
        puppyName: "Cuddles",
        requestedService: "Grooming",
        serviced: true,
        prevEntryId: null,
        nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
      },
      {
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: "testid",
      },
    ];

    const newEntries = addEntry(
      entryToAdd,
      mockedWaitlists,
      mockedWaitlists[0]
    );

    expect(newEntries).toEqual(expectedEntries);
  });

  it("returns ordered array of entries excluding the removed one", () => {
    const entryToDelete = {
      id: "testid",
      arrival: "2022-12-05T15:01:40Z",
      owner: "Joe",
      puppyName: "Brutus",
      requestedService: "Hair Cut",
      serviced: false,
      prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
      nextEntryId: null,
    };
    const expectedEntries: Entry[] = [
      {
        id: "45658a88-6441-46b2-933a-23817d2c1fbc",
        arrival: "2022-12-05T12:00:00Z",
        owner: "Bill Thornberry",
        puppyName: "Cuddles",
        requestedService: "Grooming",
        serviced: true,
        prevEntryId: null,
        nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
      },
      {
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: null,
      },
    ];

    const newEntries = deleteEntry(
      entryToDelete,
      mockedWaitlists[0].entries,
      mockedWaitlists
    );

    expect(newEntries).toEqual(expectedEntries);
  });

  it("returns ordered array of entries including the updated one", () => {
    const entries: Entry[] = [
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
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: null,
      },
    ];
    const expectedEntries: Entry[] = [
      {
        id: "45658a88-6441-46b2-933a-23817d2c1fbc",
        arrival: "2022-12-05T12:00:00Z",
        owner: "Bill Thornberry",
        puppyName: "Cuddles",
        requestedService: "Grooming",
        serviced: true,
        prevEntryId: null,
        nextEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
      },
      {
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: null,
      },
    ];

    const newEntries = changeEntry(entries[0], entries);
    expect(newEntries).toEqual(expectedEntries);
  });
});
