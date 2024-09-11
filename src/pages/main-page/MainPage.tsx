import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { MainScreen } from "../../components/mainscreen";
import { ProductSlider } from "../../components/product-slider";
import { fetchAllProducts } from "../../features/products";
import styles from "./MainPage.module.scss";
import { useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import categories from "../../shared/global/utils/categories";
import { PromoTimer } from "../../components/promo-timer";

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts() as any);
  }, [dispatch]);

  const { products } = useAppSelector((state: RootState) => state.products);

  const reversedProducts = [...products].reverse();

  return (
    <section className={styles.homepage}>
      <MainScreen />
      <ProductSlider products={products} type={"normal"} />
      <PromoTimer />
      <ProductSlider categories={categories} type={"category"} />
      <ProductSlider products={reversedProducts} type={"another"} />
    </section>
  );
};
