import "./PromoTimer.scss";
import sale from "../../assets/img/sale/sale-1.jpg";
import arrowWhite from "../../assets/img/icons/arrow-white.svg";

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
    <section className="sale">
      <img className="sale__img" src={sale} alt="sale-1.jpg" />

      <div className="sale__content">
        <div className="sale__block">
          <h2 className="sale__title">
            Get 30% sale for summer collection
          </h2>
          <p className="sale__text">
            The most wanted styles are waiting for you right now. Find the best
            styles of modern outfits for you at one place.
          </p>
        </div>

        <hr className="sale__hr" />

        <div className="timer">
          <div className="timer__items">{/* Timer content goes here */}</div>
        </div>

        <div className="sale__button">
          <button
            className="button button_lg button_default button_full-size"
            type="submit"
          >
            Buy Now
            <img className="icon-arrow" src={arrowWhite} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
};
