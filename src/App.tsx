import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainScreen } from "./components/mainscreen";
import { ProductCard } from "./components/product-card";

function App() {
  return (
    <div className="page">
      <Header />

      <main className="page__container">
        <MainScreen />
        <div className="page__cards">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
