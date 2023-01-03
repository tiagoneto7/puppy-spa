import styles from "./styles.module.css";
import puppySpaLogo from "./puppy-spa.svg";

function PuppySpaLogo() {
  return <img src={puppySpaLogo} className={styles.logo} alt="React logo" />;
}

export default PuppySpaLogo;
