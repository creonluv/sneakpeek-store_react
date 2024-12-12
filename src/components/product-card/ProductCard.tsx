import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { RootState } from "../../app/store";
import { ProductCatalog } from "../../types/ProductsToCatalog";
import {
  fetchFavourite,
  toggleItemInFavourite,
} from "../../features/favourite";

import { useAuthContext } from "../../context/AuthContext";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Product } from "../../types/Products";
import { Category } from "../../types/Categories";
import { Product as ProductFav } from "../../types/Bucket";

import clockIcon from "../../assets/img/icons/clock.svg";
import arrowIcon from "../../assets/img/icons/arrow.svg";
import heartIcon from "../../assets/img/icons/heart.svg";
import heartPressedIcon from "../../assets/img/icons/heart-pressed.svg";
import shoesImg from "../../assets/img/categories/shoes.png";
import tshirtsImg from "../../assets/img/categories/t-shirts.png";
import hoodiesImg from "../../assets/img/categories/hoodies.png";
import jeensImg from "../../assets/img/categories/jeans.png";

import "./ProductCard.scss";

type Props = {
  product?: Product | ProductCatalog | ProductFav;
  type: string;
  category?: Category;
  id: number;
};

export const ProductCard: React.FC<Props> = ({
  product,
  type,
  category,
  id,
}) => {
  const dispatch = useAppDispatch();

  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  const { isAuth } = useAuthContext();

  const photosOfCategory = [shoesImg, tshirtsImg, hoodiesImg, jeensImg];

  const elemementInFavourite = useMemo(() => {
    return favourite.find((item) => item.id === id);
  }, [favourite, id]);

  const handleFavButton = useCallback(
    (id: number) => {
      dispatch(toggleItemInFavourite(id)).then(() =>
        dispatch(fetchFavourite())
      );
    },
    [dispatch, favourite]
  );

  const getLink = (id: number, category?: Category) => {
    if (category) {
      return `catalog?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1&categoryIds=${category.categoryIds}`;
    }

    return `/product/${id}`;
  };

  return (
    <div className="card">
      <Link className="card__link" to={getLink(id, category)}>
        <img
          className="card__img"
          src={
            type !== "category"
              ? `https://localhost:9091/api/images/${product?.main_photo_id}`
              : category?.id
                ? photosOfCategory[category.id - 1]
                : photosOfCategory[0]
          }
          alt="img-of-item"
        />
      </Link>

      <Link className="card__linkInfo" to={`/product/${id}`}>
        <div className="card__information">
          <div className="card__description">
            {product && (
              <p className="card__producer title-5">
                {product?.producer?.name || "Unknown Producer"}
              </p>
            )}

            <p className="card__title">
              {product && (product?.name || "Unnamed Product")}
              {category && category?.description}
            </p>
          </div>
          {product && <p className="card__price">${product?.price || "N/A"}</p>}
        </div>
      </Link>

      <div className="card__infolabel">
        <span>
          {type !== "category" ? "new" : category?.infolabel || "N/A"}
        </span>

        <img
          className="card__infolabel_icon"
          src={type !== "category" ? clockIcon : arrowIcon}
          alt=""
        />
      </div>

      {isAuth && product && (
        <div className="card__button">
          <button
            className="card__buttonIcon"
            onClick={() => handleFavButton(id)}
          >
            {elemementInFavourite?.id ? (
              <img
                className="card__buttonIconImg"
                src={heartPressedIcon}
                alt=""
              />
            ) : (
              <img className="card__buttonIconImg" src={heartIcon} alt="" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
