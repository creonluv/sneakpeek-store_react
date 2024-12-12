import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../assets/img/logo.svg";

import "./NotFoundPage.scss";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/404");
  }, [navigate]);

  return (
    <section className="notfound">
      <div className="notfound__container">
        <div className="notfound__body">
          <div className="notfound__maincontent">
            <div className="notfound__top">
              <img
                className="notfound__logo"
                src={logo}
                alt="logo.svg"
              />
              <h1 className="notfound__title title-2">
                {t("pages.notfound.title")}
              </h1>
            </div>
            <div className="notfound__block">
              <p className="notfound__text">
                {t("pages.notfound.text")}{" "}
                <Link to="/" style={{ color: "blue" }}>
                  {t("pages.notfound.link")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
