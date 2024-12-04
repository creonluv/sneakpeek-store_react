import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import sale from "../../assets/img/sale/sale-1.jpg";
import arrowWhite from "../../assets/img/icons/arrow-white.svg";

import "./PromoTimer.scss";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const PromoTimer = () => {
  const { t } = useTranslation();

  const calculateTimeLeft = (): TimeLeft | {} => {
    const difference = +new Date("2024-12-25") - +new Date();
    let timeLeft: TimeLeft | {} = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    const value = (timeLeft as TimeLeft)[interval as keyof TimeLeft];
    return (
      <div
        key={interval}
        className={`timer__item timer__${interval}`}
        data-title={t(`components.timer.${interval}`)}
      >
        {value < 10 ? `0${value}` : value}
      </div>
    );
  });

  return (
    <section className="sale">
      <div className="sale__container">
        <div className="sale__body">
          <div className="sale__img-wrapper">
            <img className="sale__img" src={sale} alt="sale-1.jpg" />
          </div>
          <div className="sale__content">
            <div className="sale__block">
              <h2 className="sale__title title-2">
                {t("components.timer.title")} 30%{" "}
              </h2>
              <p className="sale__text text-muted">
                {t("components.timer.text")}
              </p>
            </div>
            <div className="sale__timer timer">
              <div className="timer__items">{timerComponents}</div>
            </div>
            <div className="sale__button button-wrapper">
              <Link
                className="button button_lg button_default"
                to="/catalog/1/sale"
              >
                <span>{t("components.timer.button")}</span>
                <img className="button__icon" src={arrowWhite} alt="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
