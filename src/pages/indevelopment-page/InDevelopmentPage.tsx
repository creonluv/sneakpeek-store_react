import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../assets/img/logo.svg";

import "./InDevelopmentPage.scss";

export const InDevelopmentPage = () => {
  const { t } = useTranslation();

  return (
    <section className="indevelopment">
      <div className="indevelopment__container">
        <div className="indevelopment__body">
          <div className="indevelopment__maincontent">
            <div className="indevelopment__top">
              <img
                className="indevelopment__logo"
                src={logo}
                alt="logo.svg"
              />
              <h1 className="indevelopment__title title-2">
                {t("pages.indevelopment.title")}
              </h1>
            </div>
            <div className="indevelopment__block">
              <p className="indevelopment__text">
                {t("pages.indevelopment.text")}{" "}
                <Link to="/" style={{ color: "blue" }}>
                  {t("pages.indevelopment.link")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
