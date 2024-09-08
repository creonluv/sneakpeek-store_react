import styles from "../product-slider/ProductSlider.module.scss";
import classNames from "classnames";

import scrollingArrows from "../../assets/img/icons/scrollingArrows.svg";

type Props = {
  scrollPosition: number;
  handlePrevClick: () => void;
  handleNextClick: () => void;
};

export const ButtonSlider: React.FC<Props> = ({
  scrollPosition,
  handlePrevClick,
  handleNextClick,
}) => {
  return (
    <>
      <button
        onClick={handlePrevClick}
        className={classNames(styles.goods__slider, {
          [styles.goods__slider_disabled]: scrollPosition === 0,
        })}
      >
        <img className={styles.goods__button} src={scrollingArrows} alt="" />
      </button>

      <button
        onClick={handleNextClick}
        className={classNames(styles.goods__slider)}
      >
        <img
          className={classNames(
            styles.goods__button,
            styles.goods__button_right
          )}
          src={scrollingArrows}
          alt=""
        />
      </button>
    </>
  );
};
