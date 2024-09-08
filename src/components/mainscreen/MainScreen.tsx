import styles from "./MainScreen.module.scss";
import bg from "../../assets/img/mainscreen/bg.jpg";
import ButtonTitle from "../button-title/ButtonTitle";

export const MainScreen = () => {
  return (
    <section className={styles.mainscreen}>
      <div className={styles.mainscreen__container}>
        <h1 className={styles.mainscreen__title}>
          sneak
          <wbr />
          peek
        </h1>

        <div className={styles.mainscreen__content}>
          <img className={styles.mainscreen__img} src={bg} alt="bg.jpg" />
          <div className={styles.mainscreen__block}>
            <p className={styles.mainscreen__text}>
              In the whole summer show, this
              <br />
              is the designer’s best look yet
            </p>

            <p className={styles.mainscreen__text}>
              17.06
              <br />
              2023
            </p>
          </div>

          <div className={styles.mainscreen__button}>
            <ButtonTitle onClick={() => {}} />
          </div>
        </div>
      </div>

      {/* <ul className={styles.mainscreen__items}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <li className="mainscreen__item" key={item}>
            <img
              className={styles.mainscreen__image}
              src={`src/assets/img/mainscreen/items/item-${item}.png`}
              alt={`item-${item}.png`}
            />
          </li>
        ))}
      </ul> */}
    </section>
  );
};
