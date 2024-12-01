import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/img/logo.svg";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

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
                404, page not found
              </h1>
            </div>
            <div className={styles.notfound__dropdownWrapper}>
              <p className={styles.notfound__text}>
                Sorry, but we couldn't find the page you were looking for.{" "}
                <Link to="/" style={{ color: "blue" }}>
                  Main page
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
