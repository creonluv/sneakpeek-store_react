import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { BreadСrumbs } from "./components/breadcrumbs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBucket } from "./features/bucket";
import { fetchFavourite } from "./features/favourite";
import { fetchAllProducts } from "./features/products";
import { fetchProductsCatalog } from "./features/catalogProducts";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isBreadCrumbsVisible =
    location.pathname !== "/" && location.pathname !== "/404";

  // useEffect(() => {
  //   dispatch(fetchBucket() as any);
  //   dispatch(fetchFavourite() as any);
  //   dispatch(fetchAllProducts() as any);
  //   dispatch(fetchProductsCatalog(location.search) as any);
  // }, [dispatch]);

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
