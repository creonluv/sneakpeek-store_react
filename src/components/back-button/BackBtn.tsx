import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import btnBack from "../../assets/img/icons/btn-back.svg";

import "./BackBtn.scss";

export const BackBtn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();

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
      className="button__back"
      onClick={handleBackClick}
    >
      <span className="button__back_icon">
        <img src={btnBack} alt="btn-back" />
      </span>

      <span className="button__back_text">{t("components.buttonBack")}</span>
    </button>
  );
};
