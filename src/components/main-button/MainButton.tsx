import classNames from "classnames";
import arrowWhite from "../../assets/img/icons/arrow-white.svg";
import styles from "./MainButton.module.scss";
import { Product } from "../../types/Products";
import { useState } from "react";

type Props = {
  title: string;
  icon: boolean;
  transparent: boolean;
  callback?: (product: Product) => void;
  product?: Product;
};

export const MainButton: React.FC<Props> = ({
  title,
  icon,
  transparent,
  callback,
  product,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed((prev) => !prev);

    if (callback && product) {
      callback(product);
    }
  };

  return (
    <button
      className={classNames(styles.button, {
        [styles.button__transparent]: transparent,
        [styles.button__pressed]: isPressed,
      })}
      onClick={handleClick}
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
