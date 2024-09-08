import styles from "./SliderIndicator.module.scss";

type Props = {
  totalCards: number;
  startIndex: number;
  cardsInView: number;
};

export const SliderIndicator: React.FC<Props> = ({
  totalCards,
  startIndex,
  cardsInView,
}) => {
  const progress = ((startIndex + cardsInView) / totalCards) * 100;

  return (
    <div className={styles.indicator}>
      <div className={styles.indicator__progressBar}>
        <div
          className={styles.indicator__progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
