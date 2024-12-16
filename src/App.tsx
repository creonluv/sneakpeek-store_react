import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import gsap from "gsap";

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

  useEffect(() => {
    const sections = document.querySelectorAll("section:not(:first-child)");

    sections.forEach((section, index) => {
      const fromDirection = index % 2 === 0 ? "-100vw" : "100vw";

      gsap.fromTo(
        section,
        { x: fromDirection, opacity: 0 },
        {
          x: "0",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.fromTo(".header", { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    gsap.fromTo(".mainscreen__title", { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    gsap.fromTo(".mainscreen__content", { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    gsap.fromTo(".footer", { y: -500, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, scrollTrigger: { trigger: ".footer", start: "top 50%", end: "bottom 50%", } });
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <main className="page">
        {isBreadCrumbsVisible && <BreadСrumbs />}

        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
