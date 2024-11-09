import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./FavouritePage.module.scss";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchAllProducts } from "../../features/products";
import { ProductSlider } from "../../components/product-slider";
import { fetchFavourite } from "../../features/favourite";
import { ProductCard } from "../../components/product-card";

export const FavouritePage = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state: RootState) => state.products);
  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchFavourite());
  }, [dispatch]);

  return (
    <section className={styles.favouritepage}>
      <div className={styles.favouritepage__header}>
        <h3 className={styles.favouritepage__title}>Favourite</h3>
        <span className={styles.favouritepage__subtitle}>1</span>
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
