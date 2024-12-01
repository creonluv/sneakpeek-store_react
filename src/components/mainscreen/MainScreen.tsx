import { useTranslation } from "react-i18next";

import ButtonTitle from "../button-title/ButtonTitle";

import bg from "../../assets/img/mainscreen/bg.jpg";

import "./MainScreen.scss";

export const MainScreen = () => {
  const { t } = useTranslation();

  return (
    <section className="mainscreen">
      <div className="mainscreen__container">
        <h1 className="mainscreen__title">
          sneak
          <wbr />
          peek
        </h1>

        <div className="mainscreen__content">
          <img className="mainscreen__img" src={bg} alt="bg.jpg" />
          <div className="mainscreen__block">
            <p className="mainscreen__text">
              {t("components.mainscreen.text1")}
              <br />
              {t("components.mainscreen.text2")}
            </p>

            <p className="mainscreen__text">
              17.06
              <br />
              2023
            </p>
          </div>

          <div className="mainscreen__button">
            <ButtonTitle onClick={() => { }} />
          </div>
        </div>
      </div>

      <ul className="mainscreen__items">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <li className="mainscreen__item" key={item}>
            <img
              className="mainscreen__image"
              src={`src/assets/img/mainscreen/items/item-${item}.png`}
              alt={`item-${item}.png`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
