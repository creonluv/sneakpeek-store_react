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
            <h1 className="thankyoupage__ttl title-3">
              {t("pages.thankyou.orderSuccess")}
            </h1>
          </div>

          <div className="thankyoupage__information">
            <p className="thankyoupage__order title-4">
              {t("pages.thankyou.order")} #17150810
            </p>
            <p className="thankyoupage__desc title-4">
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
