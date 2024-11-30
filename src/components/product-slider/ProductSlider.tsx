import { useCallback, useEffect, useRef, useState } from "react";
import "./ProductSlider.scss";
import { ProductCard } from "../product-card";
import { ButtonSlider } from "../button-slider";
import { SliderIndicator } from "./slider-indicator";
import { Product } from "../../types/Products";
import { Category } from "../../types/Categories";

type Props = {
  products?: Product[];
  type: string;
  categories?: Category[];
};

export const ProductSlider: React.FC<Props> = ({
  products,
  type,
  categories,
}) => {
  const productsRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const productWidth = useRef<number>(0);
  const [cardsInView, setCardsInView] = useState(0);

  console.log(scrollPosition);

  useEffect(() => {
    if (productsRef.current) {
      const card = productsRef.current.querySelector(".goods__card");

      if (card) {
        productWidth.current = card.getBoundingClientRect().width;
      }
      setCardsInView(
        Math.floor(productsRef.current.offsetWidth / productWidth.current)
      );
    }
  }, [products]);

  const handlePrevClick = useCallback(() => {
    if (productsRef.current) {
      setScrollPosition((prev) =>
        Math.max(prev - productWidth.current - 20, 0)
      );
    }
  }, []);

  const handleNextClick = useCallback(() => {
    if (productsRef.current && products) {
      const maxScrollPosition =
        products.length * (productWidth.current + 20) -
        productsRef.current.offsetWidth;

      setScrollPosition((prev) => {
        if (prev + productWidth.current + 20 >= maxScrollPosition) {
          return 0;
        }
        return Math.min(prev + productWidth.current + 20, maxScrollPosition);
      });
    }
  }, [products?.length]);

  const titleOfBlock =
    type === "normal"
      ? "New Collection"
      : type === "sale"
      ? "Best Seller"
      : type === "category"
      ? "Categories"
      : "You May Also Like";

  return (
    <section className="goods">
      <div className="goods__header">
        <h2 className="goods__title">{titleOfBlock}</h2>
        <div className="goods__buttons">
          <ButtonSlider
            scrollPosition={scrollPosition}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        </div>
      </div>
      <div className="goods__cards_wrapper">
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
                    key={product.id}
                    product={product}
                    type={type}
                    id={product.id}
                  />
                </div>
              ))
            : categories?.map((product) => (
                <div key={product.id} className="goods__card">
                  <ProductCard
                    key={product.id}
                    category={product}
                    type={type}
                    id={product.id}
                  />
                </div>
              ))}
        </div>
      </div>

      <SliderIndicator
        totalCards={products?.length || categories?.length || 0}
        startIndex={Math.floor(scrollPosition / productWidth.current)}
        cardsInView={cardsInView}
      />
    </section>
  );
};
