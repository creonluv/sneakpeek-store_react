import { useDispatch } from "react-redux";
import { Aside } from "../../components/catalog/aside";
import { Categories } from "../../components/catalog/categories";
import styles from "./CatalogPage.module.scss";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { fetchProductsCatalog } from "../../features/catalogProducts";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../../components/product-card";
import { Pagination } from "../../components/catalog/pagination";
import { AsideAdaptive } from "../../components/catalog/asideAdaptive";
import { useAsideContext } from "../../context/AsideContext";
import { fetchAllProducts } from "../../features/products";
import { fetchFavourite } from "../../features/favourite";
import { useModalContext } from "../../context/ModalContext";
import { useTranslation } from "react-i18next";

export const CatalogPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { showModal } = useModalContext();
  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);

  const { products, loading, messages } = useAppSelector(
    (state: RootState) => state.catalogProducts
  );

  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  useEffect(() => {
    dispatch(fetchAllProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductsCatalog(location.search) as any);
    dispatch(fetchFavourite() as any);
  }, [location.search, favourite.length]);

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

  const { isAsideOpen, toggleAside } = useAsideContext();

  return (
    <section className={styles.catalogpage}>
      <div className={styles.catalogpage__body}>
        <div className={styles.catalogpage__aside}>
          <Aside />
        </div>

        <div className={styles.catalogpage__main}>
          <div className={styles.catalogpage__chips}>
            <h3 className={styles.catalogpage__title}>{t("components.pages.catalog.title")}</h3>
            <Categories />

            {isAsideOpen && (
              <AsideAdaptive
                isAsideOpen={isAsideOpen}
                setIsAsideOpen={toggleAside}
              />
            )}
          </div>

          <div className={styles.catalogpage__products}>
            {products.content.map((product) => (
              <ProductCard
                product={product}
                type={"normal"}
                key={product.id}
                id={product.id}
              />
            ))}
          </div>

          {products.content.length === 0 && (
            <p className={styles.catalogpage__errorSearch}>
              {t("components.pages.catalog.nothing")}
            </p>
          )}

          <Pagination />
        </div>
      </div>
    </section>
  );
};
