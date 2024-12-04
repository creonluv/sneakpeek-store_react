import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ProductCard } from "../product-card";
import { ProductCardSkeleton } from "../product-card-skeleton/ProductCardSkeleton";
import { ButtonSlider } from "../button-slider";
import { SliderIndicator } from "./slider-indicator";
import { Product } from "../../types/Products";
import { Category } from "../../types/Categories";

import "./ProductSlider.scss";

type Props = {
  products?: Product[];
  type: string;
  categories?: Category[];
  loading: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  type,
  categories,
  loading,
}) => {
  const { t } = useTranslation();

  const productsRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cardsInView, setCardsInView] = useState(0);
  const [productWidth, setProductWidth] = useState(0);

  const titleOfBlock =
    type === "normal"
      ? t("components.slider.new")
      : type === "sale"
        ? t("components.slider.best")
        : type === "category"
          ? t("components.slider.categories")
          : t("components.slider.default");

  const updateCardsInView = () => {
    if (productsRef.current) {
      const card = productsRef.current.querySelector(".goods__card");

      if (card) {
        const width = card.getBoundingClientRect().width;
        const containerWidth = productsRef.current.offsetWidth;

        setProductWidth(width);

        const maxVisibleCards = Math.floor(containerWidth / width);

        setCardsInView(maxVisibleCards);

        productsRef.current.style.width = `${maxVisibleCards * width + (maxVisibleCards - 1) * 20
          }px`;
      }
    }
  };

  const handlePrevClick = useCallback(() => {
    if (productsRef.current) {
      setScrollPosition((prev) => Math.max(prev - productWidth - 20, 0));
    }
  }, [productWidth]);

  const handleNextClick = useCallback(() => {
    if (productsRef.current && products) {
      const maxScrollPosition =
        products.length * (productWidth + 20) - productsRef.current.offsetWidth;

      setScrollPosition((prev) => {
        if (prev + productWidth + 20 >= maxScrollPosition) {
          return 0;
        }
        return Math.min(prev + productWidth + 20, maxScrollPosition);
      });
    }
  }, [productWidth, products?.length]);

  useEffect(() => {
    updateCardsInView();

    window.addEventListener("resize", updateCardsInView);

    return () => {
      window.removeEventListener("resize", updateCardsInView);
    };
  }, [products]);

  return (
    <section className="goods">
      <div className="goods__container">
        <div className="goods__body">
          <div className="goods__header">
            <h2 className="goods__title title-2">{titleOfBlock}</h2>
            <div className="goods__buttons">
              <ButtonSlider
                scrollPosition={scrollPosition}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
              />
            </div>
          </div>
          <div className="goods__cards_wrapper">
            {loading ? (
              <ProductCardSkeleton count={cardsInView || 4} gridClass="slider" />
            ) : (
              <div
                className="goods__cards"
                ref={productsRef}
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
                  transition: "transform 0.3s ease",
                }}
              >
                {products
                  ? products.map((product) => (
                    <div key={product.id} className="goods__card">
                      <ProductCard
                        product={product}
                        type={type}
                        id={product.id}
                      />
                    </div>
                  ))
                  : categories?.map((category) => (
                    <div key={category.id} className="goods__card">
                      <ProductCard
                        category={category}
                        type={type}
                        id={category.id}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <SliderIndicator
            totalCards={products?.length || categories?.length || 0}
            startIndex={Math.floor(scrollPosition / productWidth)}
            cardsInView={cardsInView}
          />
        </div>
      </div>
    </section>
  );
};
