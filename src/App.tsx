import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { BreadСrumbs } from "./components/breadcrumbs";

function App() {
  const location = useLocation();
  const isBreadCrumbsVisible =
    location.pathname !== "/" && location.pathname !== "/404";

  return (
    <div className="page">
      <Header />

      <main className="page__container">
        {isBreadCrumbsVisible && <BreadСrumbs />}

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
