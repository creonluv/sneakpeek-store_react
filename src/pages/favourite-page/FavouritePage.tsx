import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchAllProducts } from "../../features/products";
import { fetchFavourite } from "../../features/favourite";

import { ProductSlider } from "../../components/product-slider";
import { ProductCard } from "../../components/product-card";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import styles from "./FavouritePage.module.scss";

export const FavouritePage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: RootState) => state.products);
  const { favourite, loading, messages } = useAppSelector(
    (state: RootState) => state.favourite
  );
  const { isAuth } = useAuthContext();
  const { showModal } = useModalContext();
  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);

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
    <section className={styles.favouritepage}>
      <div className={styles.favouritepage__header}>
        <h3 className={styles.favouritepage__title}>Favourite</h3>
        <span className={styles.favouritepage__subtitle}>
          {favourite.length}
        </span>
      </div>

      <div className={styles.favouritepage__container}>
        <div className={styles.favouritepage__productsBody}>
          <div className={styles.favouritepage__products}>
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

        <div className={styles.favouritepage__slider}>
          <ProductSlider products={products} type={"another"} />
        </div>
      </div>
    </section>
  );
};
