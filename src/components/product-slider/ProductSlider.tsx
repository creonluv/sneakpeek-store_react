import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProductSlider.module.scss";
import { ProductCard } from "../product-card";
import { ButtonSlider } from "../button-slider";
import { SliderIndicator } from "./slider-indicator";
import { Product } from "../../types/Products";

type Props = {
  products: Product[];
  type: string;
};

export const ProductSlider: React.FC<Props> = ({ products, type }) => {
  const [productWidth, setProductWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [cardsInView, setCardsInView] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);
  const scrollingByScript = useRef(false);

  useEffect(() => {
    const updateProductWidth = () => {
      if (productsRef.current) {
        const firstProduct = productsRef.current
          .firstElementChild as HTMLElement;

        if (firstProduct) {
          setProductWidth(firstProduct.clientWidth);
        }
        setTotalCards(productsRef.current.children.length);
      }
    };

    updateProductWidth();

    window.addEventListener("resize", updateProductWidth);

    return () => {
      window.removeEventListener("resize", updateProductWidth);
    };
  }, [products]);

  useEffect(() => {
    if (productsRef.current) {
      setCardsInView(
        Math.floor(productsRef.current.clientWidth / productWidth)
      );
    }
  }, [productWidth]);

  const handleScroll = useCallback(() => {
    if (!scrollingByScript.current && productsRef.current) {
      setScrollPosition(productsRef.current.scrollLeft);
    }
  }, [scrollingByScript, productsRef.current]);

  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (productsRef.current) {
        productsRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const handlePrevClick = useCallback(() => {
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
  }, [productWidth]);

  const handleNextClick = useCallback(() => {
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

        console.log(productWidth);

        setTimeout(() => {
          setScrollPosition(nextScroll);
          scrollingByScript.current = false;
        }, 500);
      }
    }
  }, [productWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [handleNextClick]);

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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
