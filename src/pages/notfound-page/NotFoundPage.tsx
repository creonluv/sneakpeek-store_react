import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../../assets/img/logo.svg";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    navigate("/404");
  }, [navigate]);

  return (
    <section className={styles.page__notfound}>
      <div className={styles.notfound__container}>
        <div className={styles.notfound__body}>
          <div className={styles.notfound__maincontent}>
            <div className={styles.notfound__top}>
              <img
                className={styles.notfound__logo}
                src={logo}
                alt="logo.svg"
              />
              <h1 className={`${styles.notfound__title} title-2`}>
                {t("pages.notfound.title")}
              </h1>
            </div>
            <div className={styles.notfound__dropdownWrapper}>
              <p className={styles.notfound__text}>
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
