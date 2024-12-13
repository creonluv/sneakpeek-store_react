import { useTranslation } from "react-i18next";

import sale from "../../assets/img/sale/sale-1.jpg";

import "./Sale.scss";

export const Sale = () => {
  const { t } = useTranslation();

  return (
    <section className="sale">
      <div className="sale__container">
        <div className="sale__body">
          <div className="sale__img-wrapper">
            <img className="sale__img" src={sale} alt="sale-2.jpg" />
          </div>
          <div className="sale__content">
            <div className="sale__block">
              <h2 className="sale__title title-2">35% {t("components.sale.title")}</h2>
              <p className="sale__text text-muted">{t("components.sale.text")}</p>
            </div>
            <form className="sale__form form-sale" action="#">
              <div className="form-sale__item">
                <input
                  className="form-sale__input text-muted"
                  type="email"
                  name="email"
                  placeholder={t("components.sale.email")}
                />
                <button className="form-sale__button" type="submit">
                  {t("components.sale.button")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
