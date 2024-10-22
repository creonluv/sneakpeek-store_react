import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { BreadСrumbs } from "./components/breadcrumbs";
import { useEffect } from "react";

import { getSizes } from "./api/sizes";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const isBreadCrumbsVisible = location.pathname !== "/" && location.pathname !== "/404";
  const { isAuth, signin, signout } = useAuthContext();

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const sizes = await getSizes();
        if (sizes) {
          signin();
        } else {
          signout();
        }
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

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
