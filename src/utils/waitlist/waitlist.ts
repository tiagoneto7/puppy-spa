//util functions for manipulating waitlist data

import { Entry } from "../../components/EntriesListItem";
import Waitlist from "../../components/Waitlist";

export const findWaitListByDate = (date: string, waitlists: Waitlist[]) => {
  const dateWaitlist = waitlists.find((w) => {
    const date1 = new Date(date);
    const date2 = new Date(w.date);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDay() === date2.getDay()
    );
  });

  return dateWaitlist;
};

export const addEntry = (
  newEntry: Entry,
  waitlists: Waitlist[],
  dateWaitlist: Waitlist
): Entry[] => {
  //search the last entries element
  const dateEntries = [...dateWaitlist.entries];
  const lastElement = dateEntries.find((e) => e.nextEntryId === null);

  //if has one, the id's are set here
  if (lastElement) {
    newEntry.prevEntryId = lastElement.id;
    const index = dateEntries.indexOf(lastElement);
    dateEntries[index].nextEntryId = newEntry.id;
  }

  //if not, newEntry is the first entry on that waitlist entries
  const newEntries = [newEntry, ...dateEntries];
  const index = waitlists.indexOf(dateWaitlist);
  waitlists[index].entries = newEntries;

  return newEntries;
};

export const deleteEntry = (
  entryToDelete: Entry,
  entries: Entry[],
  waitlists: Waitlist[]
): Entry[] => {
  //update next and previous id's
  if (entryToDelete.prevEntryId) {
    const previousElement = entries.find(
      (e) => e.id === entryToDelete.prevEntryId
    );
    if (previousElement) {
      const previousIndex = entries.indexOf(previousElement);
      entries[previousIndex].nextEntryId = entryToDelete.nextEntryId;
    }
  }

  if (entryToDelete.nextEntryId) {
    const nextElement = entries.find((e) => e.id === entryToDelete.nextEntryId);
    if (nextElement) {
      const nextIndex = entries.indexOf(nextElement);
      entries[nextIndex].prevEntryId = entryToDelete.prevEntryId;
    }
  }

  //remove the entry
  let newEntries = [...entries];
  newEntries = newEntries.filter((e) => e.id !== entryToDelete.id);

  //find and update the waitlist
  const dateWaitlist = findWaitListByDate(entryToDelete.arrival, waitlists);

  if (dateWaitlist) {
    const index = waitlists.indexOf(dateWaitlist);
    waitlists[index].entries = newEntries;
  }

  return newEntries;
};

export const changeEntry = (
  entryToUpdate: Entry,
  entries: Entry[]
): Entry[] => {
  const index = entries.indexOf(entryToUpdate);
  const newEntries = [...entries];
  newEntries[index].serviced = !newEntries[index].serviced;

  return newEntries;
};
