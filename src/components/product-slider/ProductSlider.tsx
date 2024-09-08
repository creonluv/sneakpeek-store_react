import { useEffect, useRef, useState } from "react";
import styles from "./ProductSlider.module.scss";
import { ProductCard } from "../product-card";
import { ButtonSlider } from "../button-slider";
import { SliderIndicator } from "./slider-indicator";

type Props = {
  type: string;
};

export const ProductSlider: React.FC<Props> = ({ type }) => {
  const [productWidth, setProductWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [cardsInView, setCardsInView] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);
  const scrollingByScript = useRef(false);

  useEffect(() => {
    if (productsRef.current) {
      const firstProduct = productsRef.current.firstElementChild;

      if (firstProduct) {
        setProductWidth(firstProduct.clientWidth);
      }
      setTotalCards(productsRef.current.children.length);
      setCardsInView(
        Math.floor(productsRef.current.clientWidth / productWidth)
      );
    }
  }, [productWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollingByScript.current && productsRef.current) {
        setScrollPosition(productsRef.current.scrollLeft);
      }
    };

    if (productsRef.current) {
      productsRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (productsRef.current) {
        productsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handlePrevClick = () => {
    if (productsRef.current) {
      const prevScroll = productsRef.current.scrollLeft - productWidth;

      scrollingByScript.current = true;

      productsRef.current.scrollBy({
        left: -productWidth - 16,
        behavior: "smooth",
      });

      setTimeout(() => {
        setScrollPosition(Math.max(0, prevScroll));
        scrollingByScript.current = false;
      }, 500);
    }
  };

  const handleNextClick = () => {
    if (productsRef.current) {
      const maxScroll =
        productsRef.current.scrollWidth - productsRef.current.clientWidth;
      const nextScroll = productsRef.current.scrollLeft + productWidth;

      scrollingByScript.current = true;

      if (nextScroll >= maxScroll) {
        productsRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        setTimeout(() => {
          setScrollPosition(0);
          scrollingByScript.current = false;
        }, 500);
      } else {
        productsRef.current.scrollBy({
          left: productWidth + 16,
          behavior: "smooth",
        });

        setTimeout(() => {
          setScrollPosition(nextScroll);
          scrollingByScript.current = false;
        }, 500);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [productWidth, scrollPosition]);

  const titleOfBlock =
    type === "normal"
      ? "New Collection"
      : type === "sale"
      ? "Best Seller"
      : type === "category"
      ? "Categories"
      : "You May Also Like";

  return (
    <section className={styles.goods}>
      <div className={styles.goods__header}>
        <h2 className={styles.goods__title}>{titleOfBlock}</h2>
        <div className={styles.goods__buttons}>
          <ButtonSlider
            scrollPosition={scrollPosition}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        </div>
      </div>

      <div className={styles.goods__cards_wrapper}>
        <div className={styles.goods__cards} ref={productsRef}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <SliderIndicator
        totalCards={totalCards}
        startIndex={Math.floor(scrollPosition / productWidth)}
        cardsInView={cardsInView}
      />
    </section>
  );
};
