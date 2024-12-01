import { useNavigate } from "react-router-dom";

import ButtonTitle from "../../components/button-title/ButtonTitle";

import styles from "./ThankYouPage.module.scss";

export const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.thankyoupage}>
      <div className={styles.thankyoupage__container}>
        <div className={styles.thankyoupage__block}>
          <div className={styles.thankyoupage__blockTitle}>
            <h3 className={styles.thankyoupage__ttl}>Order success!</h3>
          </div>

          <div className={styles.thankyoupage__information}>
            <p className={styles.thankyoupage__order}>Your Order #17150810</p>
            <p className={styles.thankyoupage__desc}>
              Wait for an sms message to your phone with other details
            </p>
          </div>

          <hr className={styles.thankyoupage__line} />

          <ButtonTitle onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};
