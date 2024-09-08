import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainScreen } from "./components/mainscreen";
import { ProductSlider } from "./components/product-slider";

function App() {
  return (
    <div className="page">
      <Header />

      <main className="page__container">
        <MainScreen />
        <div className="page__cards">
          <ProductSlider type={"normal"} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
