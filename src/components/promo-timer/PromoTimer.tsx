import { useEffect, useState } from "react";
import styles from "./PromoTimer.module.scss";
import sale from "../../assets/img/sale/sale-1.jpg";
import { TimeLeft } from "../../types/Times";
import { MainButton } from "../main-button";

export const PromoTimer = () => {
  // const calculateTimeLeft = (): TimeLeft => {
  //   const difference = +new Date("2024-06-01") - +new Date();

  //   return {
  //     days: difference > 0 ? Math.floor(difference / (1000 * 60 * 60 * 24)) : 0,
  //     hours:
  //       difference > 0 ? Math.floor((difference / (1000 * 60 * 60)) % 24) : 0,
  //     minutes: difference > 0 ? Math.floor((difference / 1000 / 60) % 60) : 0,
  //     seconds: difference > 0 ? Math.floor((difference / 1000) % 60) : 0,
  //   };
  // };

  // const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft(calculateTimeLeft());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // const timerComponents = Object.keys(timeLeft).map((interval) => {
  //   return (
  //     <div
  //       key={interval}
  //       className={`timer__item timer__${interval}`}
  //       data-title="saletimer"
  //     >
  //       {timeLeft[interval as keyof TimeLeft] < 10
  //         ? `0${timeLeft[interval as keyof TimeLeft]}`
  //         : timeLeft[interval as keyof TimeLeft]}
  //     </div>
  //   );
  // });

  return (
    <section className={styles.sale}>
      <img className={styles.sale__img} src={sale} alt="sale-1.jpg" />

      <div className={styles.sale__content}>
        <div className={styles.sale__block}>
          <h2 className={styles.sale__title}>
            Get 30% sale for summer collection
          </h2>
          <p className={styles.sale__text}>
            The most wanted styles is waiting for you right now. Find the best
            styles of modern outfits for you at one place.
          </p>
        </div>

        <hr className={styles.sale__hr} />

        <div className={styles.timer}>
          <div className={styles.timer__items}>{}</div>
        </div>

        <div className={styles.sale__button}>
          <MainButton title="Buy Now" icon={true} transparent={false} />
        </div>
      </div>
    </section>
  );
};
