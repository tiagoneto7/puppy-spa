import EntriesListItem, { Entry } from "../EntriesListItem";
import styles from "./styles.module.css";

type EntriesListProps = {
  entries: Entry[];
  onEntryChange(entryToUpdate: Entry): void;
  onEntryDelete(entryToDelete: Entry): void;
};

function EntriesList({
  entries,
  onEntryChange,
  onEntryDelete,
}: EntriesListProps) {
  return (
    <div className={styles.pageWrapper}>
      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Puppy</th>
            <th>Service</th>
            <th>Time of Arrival</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((e) => (
            <EntriesListItem
              onDelete={onEntryDelete}
              onEntryChange={onEntryChange}
              key={e.id}
              entry={e}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntriesList;
