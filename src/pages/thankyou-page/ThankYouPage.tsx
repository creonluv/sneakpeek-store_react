import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ButtonTitle from "../../components/button-title/ButtonTitle";

import "./ThankYouPage.scss";

export const ThankYouPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="thankyoupage">
      <div className="thankyoupage__container">
        <div className="thankyoupage__block">
          <div className="thankyoupage__blockTitle">
            <h3 className="thankyoupage__ttl">
              {t("pages.thankyou.orderSuccess")}
            </h3>
          </div>

          <div className="thankyoupage__information">
            <p className="thankyoupage__order">
              {t("pages.thankyou.order")} #17150810
            </p>
            <p className="thankyoupage__desc">
              {t("pages.thankyou.wait")}
            </p>
          </div>

          <hr className="thankyoupage__line" />

          <ButtonTitle onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};
