import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { checkAuth } from "./api/auth";

import { useAuthContext } from "./context/AuthContext";

import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { BreadСrumbs } from "./components/breadcrumbs";

import "./i18n";

import "./App.scss";

function App() {
  const location = useLocation();
  const isBreadCrumbsVisible =
    location.pathname !== "/" && location.pathname !== "/404";

  const { signin, signout } = useAuthContext();

  useEffect(() => {
    const query = async () => {
      try {
        await checkAuth();
        signin();
      } catch (error) {
        signout();
      }
    };

    query();
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
