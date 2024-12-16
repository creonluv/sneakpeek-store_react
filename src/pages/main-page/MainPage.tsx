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
import "../../shared/commonStyles/sale.scss";

export const MainPage = () => {
  const dispatch = useDispatch();

  const { products, loading } = useAppSelector(
    (state: RootState) => state.products
  );

  const reversedProducts = [...products].reverse();

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

  return (
    <>
      <MainScreen />
      <ProductSlider products={products} type={"normal"} loading={loading} />
      <PromoTimer />
      <ProductSlider
        categories={categories}
        type={"category"}
        loading={loading}
      />
      <Blog />
      <ProductSlider
        products={reversedProducts}
        type={"another"}
        loading={loading}
      />
      <Sale />
    </>
  );
};
