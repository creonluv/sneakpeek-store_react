import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

import { Aside } from "../../components/catalog/aside";
import { Categories } from "../../components/catalog/categories";
import { ProductCard } from "../../components/product-card";
import { Pagination } from "../../components/catalog/pagination";
import { AsideAdaptive } from "../../components/catalog/asideAdaptive";
import { ProductCardSkeleton } from "../../components/product-card-skeleton/ProductCardSkeleton";

import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { fetchFavourite } from "../../features/favourite";
import { fetchProductsCatalog } from "../../features/catalogProducts";

import { useAsideContext } from "../../context/AsideContext";
import { useModalContext } from "../../context/ModalContext";

import { useTranslation } from "react-i18next";

import "./CatalogPage.scss";
import ScrollToTop from "../../components/scrollToTop/scrollToTop";

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
    dispatch(fetchProductsCatalog(location.search) as any);
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchFavourite() as any);
  }, [favourite.length]);

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
      <ScrollToTop />

      <div className="catalog__container">
        <div className="catalog__body">
          <div className="catalog__aside">
            <Aside />
          </div>

          <div className="catalog__main">
            <div className="catalog__chips">
              <h1 className="catalog__title title-3">
                {t("pages.catalog.title")}
              </h1>
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
              <div className="catalog__products">
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
              <p className="catalog__error title-3">
                {t("components.pages.catalog.nothing")}
              </p>
            )}

            {!loading && <Pagination />}
          </div>
        </div>
      </div>
    </section>
  );
};
