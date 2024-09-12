import classNames from "classnames";
import arrowWhite from "../../assets/img/icons/arrow-white.svg";
import styles from "./MainButton.module.scss";

type Props = {
  title: string;
  icon: boolean;
  transparent: boolean;
};

export const MainButton: React.FC<Props> = ({ title, icon, transparent }) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.button__transparent]: transparent,
      })}
    >
      <div className={styles.button__body}>
        <p className={styles.button__title}>{title}</p>

        {icon && (
          <img className={styles.button__icon} src={arrowWhite} alt="arrow" />
        )}
      </div>
    </button>
  );
};
