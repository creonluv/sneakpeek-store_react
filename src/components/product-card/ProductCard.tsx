import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

import clockIcon from "../../assets/img/icons/clock.svg";
import arrowIcon from "../../assets/img/icons/arrow.svg";
import heartIcon from "../../assets/img/icons/heart.svg";
import shoesImg from "../../assets/img/categories/shoes.png";
import tshirtsImg from "../../assets/img/categories/t-shirts.png";
import hoodiesImg from "../../assets/img/categories/hoodies.png";
import jeensImg from "../../assets/img/categories/jeans.png";
import accesImg from "../../assets/img/categories/acces.png";
import { Product } from "../../types/Products";
import { Category } from "../../types/Categories";
import { ProductCatalog } from "../../types/ProductsToCatalog";

type Props = {
  product?: Product | ProductCatalog;
  type: string;
  category?: Category;
  id: number;
};

export const ProductCard: React.FC<Props> = ({ product, type, category, id }) => {
  const photosOfCategory = [shoesImg, tshirtsImg, hoodiesImg, jeensImg, accesImg];

  return (
    <div className={styles.card}>
      <Link className={styles.card__link} to={`/product/${id}`}>
        <img
          className={styles.card__img}
          src={
            type !== "category"
              ? `https://localhost:8443/api/images/${product?.main_photo_id}`
              : category?.id
              ? photosOfCategory[category.id - 1]
              : photosOfCategory[0]
          }
          alt="img-of-item"
        />
      </Link>

      <Link className={styles.card__linkInfo} to={`/product/${id}`}>
        <div className={styles.card__information}>
          <div className={styles.card__description}>
            {product && <p className={styles.card__producer}>{product?.producer?.name || "Unknown Producer"}</p>}

            <p className={styles.card__title}>
              {product && (product?.name || "Unnamed Product")}
              {category && category?.description}
            </p>
          </div>
          {product && <p className={styles.card__price}>${product?.price || "N/A"}</p>}
        </div>
      </Link>

      <div className={styles.card__infolabel}>
        {type !== "category" ? "new" : category?.infolabel || "N/A"}

        <img className={styles.card__infolabel_icon} src={type !== "category" ? clockIcon : arrowIcon} alt="" />
      </div>

      {product && (
        <div className={styles.card__button}>
          <button className={styles.card__buttonIcon}>
            <img className={styles.card__buttonIconImg} src={heartIcon} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};
