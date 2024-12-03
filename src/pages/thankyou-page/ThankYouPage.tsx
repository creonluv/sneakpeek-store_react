import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ButtonTitle from "../../components/button-title/ButtonTitle";

import styles from "./ThankYouPage.module.scss";

export const ThankYouPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles.thankyoupage}>
      <div className={styles.thankyoupage__container}>
        <div className={styles.thankyoupage__block}>
          <div className={styles.thankyoupage__blockTitle}>
            <h3 className={styles.thankyoupage__ttl}>
              {t("pages.thankyou.orderSuccess")}
            </h3>
          </div>

          <div className={styles.thankyoupage__information}>
            <p className={styles.thankyoupage__order}>
              {t("pages.thankyou.order")} #17150810
            </p>
            <p className={styles.thankyoupage__desc}>
              {t("pages.thankyou.wait")}
            </p>
          </div>

          <hr className={styles.thankyoupage__line} />

          <ButtonTitle onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};
