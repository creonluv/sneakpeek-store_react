import styles from "./ProductCard.module.scss";

import photo from "../../assets/img/mainscreen/Photo of product.png";
import clockIcon from "../../assets/img/icons/clock.svg";
import heartIcon from "../../assets/img/icons/heart.svg";
// import pressIcon from "../../assets/img/icons/heart-pressed.svg";

export const ProductCard = () => {
  return (
    <div className={styles.card}>
      <a className={styles.card__link} href="/">
        <img className={styles.card__img} src={photo} alt="img-of-item" />
      </a>

      <a className={styles.card__link} href="/">
        <div className={styles.card__information}>
          <div className={styles.card__description}>
            <p className={styles.card__producer}>Nike SB</p>
            <p className={styles.card__title}>Hoodie for skateboarding</p>
          </div>

          <p className={styles.card__price}>$219</p>
        </div>
      </a>

      <div className={styles.card__infolabel}>
        new
        <img className={styles.card__infolabel_icon} src={clockIcon} alt="" />
      </div>

      <div className={styles.card__button}>
        <button className={styles.card__buttonIcon}>
          <img className={styles.card__buttonIconImg} src={heartIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
