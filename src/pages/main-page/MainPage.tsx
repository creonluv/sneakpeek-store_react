import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { MainScreen } from "../../components/mainscreen";
import { ProductSlider } from "../../components/product-slider";
import { fetchAllProducts } from "../../features/products";
import "./MainPage.scss";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import categories from "../../shared/utils/categories";
import { PromoTimer } from "../../components/promo-timer";
import { Blog } from "../../components/blog";
import { Sale } from "../../components/sale";

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
