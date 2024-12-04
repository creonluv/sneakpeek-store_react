import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

import { Aside } from "../../components/catalog/aside";
import { Categories } from "../../components/catalog/categories";
import { ProductCard } from "../../components/product-card";
import { Pagination } from "../../components/catalog/pagination";
import { AsideAdaptive } from "../../components/catalog/asideAdaptive";

import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { fetchAllProducts } from "../../features/products";
import { fetchFavourite } from "../../features/favourite";
import { fetchProductsCatalog } from "../../features/catalogProducts";

import { useAsideContext } from "../../context/AsideContext";
import { useModalContext } from "../../context/ModalContext";

import { useTranslation } from "react-i18next";

import "./CatalogPage.scss";
import { ProductCardSkeleton } from "../../components/product-card-skeleton/ProductCardSkeleton";

export const CatalogPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const [, setMessageCounter] = useState(0);
  const [wasModalShown, setWasModalShown] = useState(false);

  const { products, loading, messages } = useAppSelector(
    (state: RootState) => state.catalogProducts
  );
  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  const { showModal } = useModalContext();
  const { isAsideOpen, toggleAside } = useAsideContext();

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

  return (
    <section className="catalog">
      <div className="catalog__body">
        <div className="catalog__aside">
          <Aside />
        </div>

        <div className="catalog__main">
          <div className="catalog__chips">
            <h3 className="catalog__title">
              {t("components.pages.catalog.title")}
            </h3>
            <Categories />

            {isAsideOpen && (
              <AsideAdaptive
                isAsideOpen={isAsideOpen}
                setIsAsideOpen={toggleAside}
              />
            )}
          </div>

          {loading ? (
            <ProductCardSkeleton count={12} />
          ) : (
            <div className="catalogpage__products">
              {products.content.map((product) => (
                <ProductCard
                  product={product}
                  type="normal"
                  key={product.id}
                  id={product.id}
                />
              ))}
            </div>
          )}

          {!loading && products.content.length === 0 && (
            <p className="catalogpage__errorSearch">
              {t("components.pages.catalog.nothing")}
            </p>
          )}

          {!loading && <Pagination />}
        </div>
      </div>
    </section>
  );
};
