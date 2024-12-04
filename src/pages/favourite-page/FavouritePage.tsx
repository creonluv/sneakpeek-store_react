import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchAllProducts } from "../../features/products";
import { fetchFavourite } from "../../features/favourite";

import { ProductSlider } from "../../components/product-slider";
import { ProductCard } from "../../components/product-card";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import "./FavouritePage.scss";

export const FavouritePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);

  const { products } = useAppSelector((state: RootState) => state.products);
  const { favourite, loading, messages } = useAppSelector(
    (state: RootState) => state.favourite
  );

  const { isAuth } = useAuthContext();
  const { showModal } = useModalContext();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchAllProducts());
      dispatch(fetchFavourite());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!loading && messages && !wasModalShown) {
      showModal(messages);
      setWasModalShown(true);

      const timer = setTimeout(() => {
        setWasModalShown(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages, loading, wasModalShown, showModal]);

  useEffect(() => {
    if (messages) {
      setMessageCounter((prev) => prev + 1);
      setWasModalShown(false);
    }
  }, [messages]);

  return (
    <section className="favourite">
      <div className="favourite__container">
        <div className="favourite__body">
          <div className="favourite__header">
            <h3 className="favourite__title">{t("pages.favourite.title")}</h3>
            <span className="favourite__subtitle">{favourite.length}</span>
          </div>
          <div className="favourite__box">
            <div className="favourite__productsBody">
              <div className="favourite__products">
                {favourite.map((product) => (
                  <ProductCard
                    product={product}
                    type={"normal"}
                    key={product.id}
                    id={product.id}
                  />
                ))}
              </div>
            </div>

            <div className="favourite__slider">
              <ProductSlider
                products={products}
                type={"another"}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
