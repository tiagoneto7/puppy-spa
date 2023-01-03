//util functions for sorting waitlist entries

import { Entry } from "../../components/EntriesListItem";
import { ServiceCheckboxFilter } from "../../components/Waitlist";

type EntryProperties = {
  arrival: string;
  owner: string;
  puppyName: string;
};

export const sortEntriesByProperty = (
  entries: Entry[],
  property: string
): Entry[] => {
  let sortedEntries: Entry[] = [...entries];
  sortedEntries = sortedEntries.sort((a, b) => {
    if (
      a[property as keyof EntryProperties] <
      b[property as keyof EntryProperties]
    ) {
      return -1;
    }
    if (
      a[property as keyof EntryProperties] >
      b[property as keyof EntryProperties]
    ) {
      return 1;
    }
    return 0;
  });

  //for the time of arrival sort, it makes sense to see the latest time on top
  if (property === "arrival") {
    return sortedEntries.reverse();
  } else {
    return sortedEntries;
  }
};

export const sortEntriesByEntryId = (entries: Entry[]): Entry[] => {
  const firstElement = entries.find((e) => e.prevEntryId === null);
  let sortedEntries: Entry[] = [];

  if (firstElement) {
    sortedEntries = [firstElement];
    //mapping allows to fetch values threw key
    const entriesMap = new Map(entries.map((e) => [e.id, e]));

    while (sortedEntries.length < entries.length) {
      //the nextEntryId will be stored on sortedEntries last element
      const nextId = sortedEntries[sortedEntries.length - 1]?.nextEntryId;

      if (nextId) {
        //map allows not to iterate the array over again to find the nextElement
        const nextElement = entriesMap.get(nextId);
        if (nextElement) {
          sortedEntries.push(nextElement);
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  return sortedEntries.reverse();
};

export const sortEntries = (sortBy: string, entries: Entry[]): Entry[] => {
  let sortedEntries: Entry[];
  if (sortBy === "identifier") {
    sortedEntries = sortEntriesByEntryId(entries);
  } else {
    sortedEntries = sortEntriesByProperty(entries, sortBy);
  }
  return sortedEntries;
};

export const filterEntries = (
  searchInput: string,
  checkbox: ServiceCheckboxFilter,
  entries: Entry[]
): Entry[] => {
  let filteredEntries = [...entries];
  const keyword = searchInput.trim().toLocaleLowerCase();

  //only filter if there is a valid search key
  if (keyword) {
    filteredEntries = filteredEntries.filter((e) => {
      return (
        e.puppyName.toLowerCase().includes(keyword) ||
        e.owner.toLowerCase().includes(keyword) ||
        e.requestedService.toLowerCase().includes(keyword)
      );
    });
  }

  //only filter if one of the service checkboxes has been touched
  if (checkbox.serviced || checkbox.unserviced) {
    filteredEntries = filteredEntries.filter((e) => {
      if (checkbox.serviced && !checkbox.unserviced) return e.serviced;
      if (!checkbox.serviced && checkbox.unserviced) return !e.serviced;
      return e;
    });
  }

  return filteredEntries;
};
