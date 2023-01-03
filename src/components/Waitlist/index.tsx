import { useState } from "react";
import AddIcon from "../../assets/icons/AddIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import data from "../../mocks/waitlist.json";
import {
  sortEntriesByEntryId,
  sortEntries,
  filterEntries,
} from "../../utils/entries/entries";
import {
  addEntry,
  changeEntry,
  deleteEntry,
  findWaitListByDate,
} from "../../utils/waitlist/waitlist";
import EntriesList from "../EntriesList";
import { Entry } from "../EntriesListItem";
import Modal from "../Modal";
import NewEntryForm from "../NewEntryForm";
import styles from "./styles.module.css";

type Waitlist = {
  date: string;
  entries: Entry[];
};

export type ServiceCheckboxFilter = {
  serviced: boolean;
  unserviced: boolean;
};

function Waitlist() {
  const [searchInput, setSearchInput] = useState("");
  const [sortedBy, setSortedBy] = useState("identifier");
  const [datePicker, setDatePicker] = useState(data.date);
  const [checkbox, setCheckbox] = useState<ServiceCheckboxFilter>({
    serviced: false,
    unserviced: false,
  });

  const [open, setOpen] = useState(false);
  const [waitlists, setWaitlists] = useState<Waitlist[]>([data]);
  const [entries, setEntries] = useState<Entry[]>(
    sortEntriesByEntryId(data.entries)
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const dateWaitlist = findWaitListByDate(value, waitlists);

    if (dateWaitlist) {
      setEntries(sortEntries(sortedBy, dateWaitlist.entries));
    } else {
      setEntries([]);
    }
    setDatePicker(value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const { name } = e.target;
    let newValue = { ...checkbox, [name]: checked };
    setCheckbox(newValue);
  };

  const handleSortSelectorChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setSortedBy(value);
    setEntries(sortEntries(value, entries));
  };

  const handleNewEntry = (newEntry: Entry) => {
    //find waitlist that wil receive new entry
    const dateWaitlist = findWaitListByDate(newEntry.arrival, waitlists);
    let newWaitlistDate = newEntry.arrival.substring(0, 10);

    if (dateWaitlist) {
      const newEntries = addEntry(newEntry, waitlists, dateWaitlist);

      setEntries(sortEntries(sortedBy, newEntries));
      setWaitlists([...waitlists]);
      setDatePicker(newWaitlistDate);
    } else {
      setEntries([newEntry]);
      setWaitlists([
        ...waitlists,
        { date: newWaitlistDate, entries: [newEntry] },
      ]);
      setDatePicker(newWaitlistDate);
    }
  };

  const handleEntryDeletion = (entryToDelete: Entry) => {
    const newEntries = deleteEntry(entryToDelete, entries, waitlists);
    setEntries(newEntries);
  };

  const handleEntryChange = (entryToUpdate: Entry) => {
    const newEntries = changeEntry(entryToUpdate, entries);
    setEntries(newEntries);
  };

  const filteredEntries = filterEntries(searchInput, checkbox, entries);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.listHeader}>
        <div className={styles.checkboxesWrapper}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="unserviced"
              onChange={handleCheckboxChange}
            />
            <label>unserviced</label>
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="serviced"
              onChange={handleCheckboxChange}
            />
            <label>serviced</label>
          </div>
        </div>

        <input
          className={styles.datePicker}
          value={datePicker}
          onChange={handleDatePickerChange}
          type="date"
          id="date"
        />

        <div className={styles.searchInputWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            onChange={handleSearchInputChange}
            value={searchInput}
          />
          <SearchIcon />
        </div>

        <div className={styles.sortSelectorWrapper}>
          <label className={styles.sortByLabel}>Sorted by</label>
          <select
            data-testid="select"
            className={styles.sortSelector}
            name="sort"
            id="sort"
            onChange={handleSortSelectorChange}
          >
            <option value="identifier">Identifier</option>
            <option value="arrival">Arrival</option>
            <option value="puppyName">Puppy</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        <button
          data-testid="open-modal-button"
          className={styles.addButton}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </button>
      </div>

      <hr className={styles.separator} />
      {filteredEntries.length ? (
        <EntriesList
          entries={filteredEntries}
          onEntryChange={handleEntryChange}
          onEntryDelete={handleEntryDeletion}
        />
      ) : (
        <h3 className={styles.noResults}>No results</h3>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <NewEntryForm
          onAddNewEntry={(e) => {
            handleNewEntry(e);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default Waitlist;
