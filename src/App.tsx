import { useDispatch } from "react-redux";
import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainScreen } from "./components/mainscreen";
import { ProductSlider } from "./components/product-slider";
import { useEffect } from "react";
import { fetchAllProducts } from "./features/products";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts() as any);
  }, [dispatch]);

  const { products } = useAppSelector((state: RootState) => state.products);

  return (
    <div className="page">
      <Header />

      <main className="page__container">
        <MainScreen />
        <div className="page__cards">
          <ProductSlider products={products} type={"normal"} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
