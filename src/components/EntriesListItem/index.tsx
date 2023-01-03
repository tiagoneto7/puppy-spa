import CheckedIcon from "../../assets/icons/CheckedIcon";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import styles from "./styles.module.css";

export type Entry = {
  id: string;
  arrival: string;
  owner: string;
  puppyName: string;
  requestedService: string;
  serviced: boolean;
  prevEntryId: string | null;
  nextEntryId: string | null;
};

type EntriesListItemProps = {
  entry: Entry;
  onDelete: (entryToRemove: Entry) => void;
  onEntryChange: (entry: Entry) => void;
};

function EntriesListItem({
  entry,
  onDelete,
  onEntryChange,
}: EntriesListItemProps) {
  return (
    <tr data-testid="data-row" className={styles.tableRow}>
      <td>
        <p>{entry.owner}</p>
      </td>
      <td>
        <p>{entry.puppyName}</p>
      </td>
      <td>
        <p>{entry.requestedService}</p>
      </td>
      <td>
        <p>{entry.arrival.substring(11, 16)}</p>
      </td>

      <td>
        <button
          className={
            entry.serviced ? styles.servicedButton : styles.unservicedButton
          }
          onClick={() => onEntryChange(entry)}
        >
          {entry.serviced ? "serviced" : "serve"}
          {entry.serviced && <CheckedIcon />}
        </button>
      </td>

      <td>
        <button
          data-testid="delete-button"
          className={styles.deleteButton}
          onClick={() => onDelete(entry)}
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
}

export default EntriesListItem;
