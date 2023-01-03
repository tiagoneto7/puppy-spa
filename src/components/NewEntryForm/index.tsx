import React, { useState } from "react";
import { Entry } from "../EntriesListItem";
import styles from "./styles.module.css";

type NewEntryFromProps = {
  onAddNewEntry: (newEntry: Entry) => void;
};

type Form = {
  owner: string;
  puppyName: string;
  requestedService: string;
};

const initialForm = {
  owner: "",
  puppyName: "",
  requestedService: "",
};

function NewEntryForm({ onAddNewEntry }: NewEntryFromProps) {
  const [form, setForm] = useState<Form>(initialForm);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: string
  ) => {
    const { value } = e.target;
    setForm({ ...form, [property]: value });
  };

  const formValid = () => {
    return form.owner && form.puppyName && form.requestedService;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newEntry = {
      id: generateUuidv4(),
      arrival: new Date().toISOString(),
      owner: form.owner,
      puppyName: form.puppyName,
      requestedService: form.requestedService,
      serviced: false,
      prevEntryId: null,
      nextEntryId: null,
    };

    onAddNewEntry(newEntry);
    setForm(initialForm);
  };

  //generates id for entries
  const generateUuidv4 = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.formTitle}>New service</h2>

        <h4 className={styles.formDate}>{new Date().toLocaleDateString()}</h4>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label>Owner</label>
          <input
            data-testid="owner-input"
            className={styles.input}
            type="text"
            onChange={(e) => handleFormChange(e, "owner")}
            value={form.owner}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label>Puppy Name</label>
          <input
            data-testid="puppy-input"
            className={styles.input}
            type="text"
            onChange={(e) => handleFormChange(e, "puppyName")}
            value={form.puppyName}
          />
        </div>

        <div className={styles.inputWrapper}>
          <label>Requested Service</label>
          <input
            data-testid="requested-service-input"
            className={styles.input}
            type="text"
            onChange={(e) => handleFormChange(e, "requestedService")}
            value={form.requestedService}
          />
        </div>
        <button
          className={styles.addButton}
          disabled={!formValid()}
          type="submit"
        >
          add service
        </button>
      </form>
    </div>
  );
}

export default NewEntryForm;
