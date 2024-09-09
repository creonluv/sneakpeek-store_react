import styles from "./ProductCard.module.scss";

import photo from "../../assets/img/mainscreen/Photo of product.png";
import clockIcon from "../../assets/img/icons/clock.svg";
import heartIcon from "../../assets/img/icons/heart.svg";
import { Product } from "../../types/Products";
// import pressIcon from "../../assets/img/icons/heart-pressed.svg";

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <a className={styles.card__link} href="/">
        <img
          className={styles.card__img}
          src={`http://localhost:9091/api/images/${product.main_photo_id}`}
          alt="img-of-item"
        />
      </a>

      <a className={styles.card__linkInfo} href="/">
        <div className={styles.card__information}>
          <div className={styles.card__description}>
            <p className={styles.card__producer}>{product.producer.name}</p>
            <p className={styles.card__title}>{product.name}</p>
          </div>

          <p className={styles.card__price}>${product.price}</p>
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
