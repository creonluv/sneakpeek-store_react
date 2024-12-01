import banner from "../../assets/img/mainscreen/banner.png";

import styles from "./ButtonTitle.module.scss";

interface ButtonTitleProps {
  onClick: () => void;
}

const ButtonTitle: React.FC<ButtonTitleProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src={banner} alt="Title Button" className={styles.image} />
    </button>
  );
};

export default ButtonTitle;
