import { Entry } from "../../components/EntriesListItem";
import { filterEntries, sortEntries } from "./entries";
import { describe, it, expect } from "vitest";

const mockedEntries: Entry[] = [
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
    id: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
    arrival: "2022-12-05T11:48:29Z",
    owner: "Jill Doe",
    puppyName: "Fluffy",
    requestedService: "Full Body Shave",
    serviced: false,
    prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
    nextEntryId: null,
  },

  {
    id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
    arrival: "2022-12-05T12:01:40Z",
    owner: "Bob Hope",
    puppyName: "Paws",
    requestedService: "Nail Clipping",
    serviced: false,
    prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
    nextEntryId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
  },
];

describe("entries array tests", () => {
  it("sort list by entry identifier", () => {
    const sortedList = [
      {
        id: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
        arrival: "2022-12-05T11:48:29Z",
        owner: "Jill Doe",
        puppyName: "Fluffy",
        requestedService: "Full Body Shave",
        serviced: false,
        prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        nextEntryId: null,
      },
      {
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
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
    ];

    expect(sortEntries("identifier", mockedEntries)).toEqual(sortedList);
  });

  it("sort list by owner name", () => {
    const sortedList = [
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
        nextEntryId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
      },
      {
        id: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
        arrival: "2022-12-05T11:48:29Z",
        owner: "Jill Doe",
        puppyName: "Fluffy",
        requestedService: "Full Body Shave",
        serviced: false,
        prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        nextEntryId: null,
      },
    ];

    expect(sortEntries("owner", mockedEntries)).toEqual(sortedList);
  });

  it("sort list by puppy name", () => {
    const sortedList = [
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
        id: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
        arrival: "2022-12-05T11:48:29Z",
        owner: "Jill Doe",
        puppyName: "Fluffy",
        requestedService: "Full Body Shave",
        serviced: false,
        prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        nextEntryId: null,
      },
      {
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
      },
    ];

    expect(sortEntries("puppyName", mockedEntries)).toEqual(sortedList);
  });

  it("sort list by arrival time", () => {
    const sortedList = [
      {
        id: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        arrival: "2022-12-05T12:01:40Z",
        owner: "Bob Hope",
        puppyName: "Paws",
        requestedService: "Nail Clipping",
        serviced: false,
        prevEntryId: "45658a88-6441-46b2-933a-23817d2c1fbc",
        nextEntryId: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
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
        id: "7fb8834f-810c-4a47-ade6-ab7999c0167d",
        arrival: "2022-12-05T11:48:29Z",
        owner: "Jill Doe",
        puppyName: "Fluffy",
        requestedService: "Full Body Shave",
        serviced: false,
        prevEntryId: "e9e365b7-8588-4205-bc03-b71cab3c1a8a",
        nextEntryId: null,
      },
    ];

    expect(sortEntries("arrival", mockedEntries)).toEqual(sortedList);
  });

  it("filters list by searched keyword and serviced filter", () => {
    const expectedEntries = [
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
    ];

    expect(
      filterEntries(
        "Cuddles",
        {
          serviced: true,
          unserviced: false,
        },
        mockedEntries
      )
    ).toEqual(expectedEntries);
  });

  it("returns empty array when none ot the entries matches the filters", () => {
    const expectedEntries: Entry[] = [];

    expect(
      filterEntries(
        "thisisatest",
        {
          serviced: false,
          unserviced: false,
        },
        mockedEntries
      )
    ).toEqual(expectedEntries);
  });
});
