import styles from "./styles.module.css";

function AddIcon() {
  return (
    <svg className={styles.addIcon} viewBox="0 0 24 24">
      <path
        strokeWidth={1}
        fill="currentColor"
        d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
      />
    </svg>
  );
}

export default AddIcon;
