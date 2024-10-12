import { useLocation, useNavigate } from "react-router-dom";
import btnBack from "../../assets/img/icons/btn-back.svg";
import styles from "./BackBtn.module.scss";

export const BackBtn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleBackClick = () => {
    if (state?.from) {
      navigate(state.from);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      type="button"
      className={styles.button__back}
      onClick={handleBackClick}
    >
      <span className={styles.button__back_icon}>
        <img src={btnBack} alt="btn-back" />
      </span>
      <span className={styles.button__back_text}>Back</span>
    </button>
  );
};
