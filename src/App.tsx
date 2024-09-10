import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainPage } from "./pages/main-page";

function App() {
  return (
    <div className="page">
      <Header />

      <main className="page__container">
        <MainPage />
      </main>

      <Footer />
    </div>
  );
}

export default App;
