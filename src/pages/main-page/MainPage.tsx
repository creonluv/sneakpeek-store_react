import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { fetchAllProducts } from "../../features/products";

import categories from "../../shared/utils/categories";

import { MainScreen } from "../../components/mainscreen";
import { ProductSlider } from "../../components/product-slider";
import { PromoTimer } from "../../components/promo-timer";
import { Blog } from "../../components/blog";
import { Sale } from "../../components/sale";

import "./MainPage.scss";

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setBackgroundImages = () => {
      const ibgElements = document.querySelectorAll<HTMLElement>(".ibg");

      ibgElements.forEach((element) => {
        const img = element.querySelector<HTMLImageElement>("img");
        if (img && img.src) {
          element.style.backgroundImage = `url(${img.src})`;
        }
      });
    };

    setBackgroundImages();
  }, []);

  useEffect(() => {
    dispatch(fetchAllProducts() as any);
  }, [dispatch]);

  const { products } = useAppSelector((state: RootState) => state.products);

  const reversedProducts = [...products].reverse();

  return (
    <section className="homepage">
      <MainScreen />
      <ProductSlider products={products} type={"normal"} />
      <PromoTimer />
      <ProductSlider categories={categories} type={"category"} />
      <Blog />
      <ProductSlider products={reversedProducts} type={"another"} />
      <Sale />
    </section>
  );
};
