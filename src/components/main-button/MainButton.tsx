import arrowWhite from "../../assets/img/icons/arrow-white.svg";
import styles from "./MainButton.module.scss";

export const MainButton = () => {
  return (
    <button className={styles.button}>
      <div className={styles.button__body}>
        <p className={styles.button__title}>Buy Now</p>
        <img className={styles.button__icon} src={arrowWhite} alt="arrow" />
      </div>
    </button>
  );
};
