import { useDispatch } from "react-redux";
import { Aside } from "../../components/catalog/aside";
import { Categories } from "../../components/categories";
import styles from "./CatalogPage.module.scss";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchProductsCatalog } from "../../features/catalogProducts";
import { useLocation } from "react-router-dom";

export const CatalogPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { products } = useAppSelector(
    (state: RootState) => state.catalogProducts
  );

  useEffect(() => {
    dispatch(fetchProductsCatalog(location.search) as any);
  }, [location.search]);

  return (
    <section className={styles.catalogpage}>
      <div className={styles.catalogpage__body}>
        <div className={styles.catalogpage__aside}>
          <Aside />
        </div>

        <div className={styles.catalogpage__main}>
          <div className={styles.catalogpage__chips}>
            <h3 className={styles.catalogpage__title}>Catalog</h3>
            <Categories />
          </div>
        </div>
        <div className={styles.catalogpage__products}></div>
      </div>
    </section>
  );
};
