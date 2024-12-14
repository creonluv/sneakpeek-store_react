import { useState } from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

import { resetPasswordInitiate, resetPasswordValidateOTP, resetPasswordComplete } from "../../api/user";

import { useModalContext } from "../../context/ModalContext";
import { useWindowSizeContext } from "../../context/WindowSizeContext";

import { LoginPageMessages } from "../../shared/utils/modalMessages";

import { ResetPasswordCompleteData } from "../../types/Auth";

import close from "../../assets/img/icons/close.svg";

import "../../shared/commonStyles/modal.scss";
import "./ForgotPassword.scss";

Modal.setAppElement("#root");

const DEFAULT_SIZE = 500;
const OFFSET_INLINE = 32;

enum ResetStage {
  REQUEST_EMAIL = "REQUEST_EMAIL",
  VERIFY_CODE = "VERIFY_CODE",
  NEW_PASSWORD = "NEW_PASSWORD",
}

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const { showModal } = useModalContext();
  const { width, height } = useWindowSizeContext();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState<ResetPasswordCompleteData>({
    email: "",
    otp: 0,
    new_password: ""
  });

  const [currentStage, setCurrentStage] = useState<ResetStage>(ResetStage.REQUEST_EMAIL);

  const openModal = () => {
    setIsOpenModal(true);
    document.body.classList.add("_lock");
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.classList.remove("_lock");
    setCurrentStage(ResetStage.REQUEST_EMAIL);
    setFormData({ email: "", otp: 0, new_password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEmailSubmit = async () => {
    const { email } = formData;

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail(email)) {
      showModal(LoginPageMessages.INVALID_EMAIL);
      return;
    }

    try {
      //await resetPasswordInitiate({ email });
      setCurrentStage(ResetStage.VERIFY_CODE);
    } catch (error) {
      showModal(LoginPageMessages.EMAIL_NOT_FOUND);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      // await resetPasswordValidateOTP({ email: formData.email, otp: formData.otp });
      setCurrentStage(ResetStage.NEW_PASSWORD);
    } catch (error) {
      showModal(LoginPageMessages.CODE_ERROR);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      // await resetPasswordComplete({ email: formData.email, otp: formData.otp, new_password: formData.new_password });
      closeModal();
      showModal(LoginPageMessages.PASSWORD_UPDATE_SUCCESS);
    } catch (error) {
      showModal(LoginPageMessages.PASSWORD_UPDATE_ERROR);
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case ResetStage.REQUEST_EMAIL:
        return (
          <>
            <p className="forgot-password__text text-muted">
              {t("components.forgotPassword.textInitiate")}
            </p>
            <form>
              <div className="group">
                <input
                  id="email"
                  className="input"
                  placeholder={t("placeholder.email")}
                  name="email"
                  value={formData.email}
                  type="email"
                  onChange={handleChange}
                />
              </div>
              <div className="changepassword__button">
                <button
                  className="button button_lg button_default button_full-size"
                  type="button"
                  onClick={handleEmailSubmit}
                >
                  {t("components.forgotPassword.buttonInitiate")}
                </button>
              </div>
            </form>
          </>
        );

      case ResetStage.VERIFY_CODE:
        return (
          <>
            <p className="forgot-password__text text-muted">
              {t("components.forgotPassword.textValidate")}
            </p>
            <form>
              <div className="group">
                <input
                  id="otp"
                  className="input"
                  placeholder={t("placeholder.code")}
                  name="otp"
                  value={formData.otp}
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <button
                className="forgot-password__link group"
                type="button"
                onClick={handleEmailSubmit}
              >
                {t("components.forgotPassword.buttonInitiateResend")}
              </button>
              <div className="changepassword__button">
                <button
                  className="button button_lg button_default button_full-size"
                  type="button"
                  onClick={handleCodeSubmit}
                >
                  {t("components.forgotPassword.buttonValidate")}
                </button>
              </div>
            </form>
          </>
        );

      case ResetStage.NEW_PASSWORD:
        return (
          <>
            <p className="forgot-password__text text-muted">
              {t("components.forgotPassword.textComplete")}
            </p>
            <form>
              <div className="group">
                <input
                  id="new_password"
                  className="input"
                  placeholder={t("placeholder.new_password")}
                  name="new_password"
                  value={formData.new_password}
                  type="password"
                  onChange={handleChange}
                />
              </div>
              <div className="changepassword__button">
                <button
                  className="button button_lg button_default button_full-size"
                  type="button"
                  onClick={handlePasswordUpdate}
                >
                  {t("components.forgotPassword.buttonComplete")}
                </button>
              </div>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <p className="text-muted">{t("components.forgotPassword.text")} <button className="form__link" type="button" onClick={openModal}>{t("components.forgotPassword.link")}</button></p>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 },
          content: {
            color: "black",
            margin: "auto",
            padding: "20px",
            width: Math.min(width - OFFSET_INLINE, DEFAULT_SIZE),
            height: Math.min(height - OFFSET_INLINE, DEFAULT_SIZE),
            maxHeight: "min-content",
            inset: "16px"
          },
        }}
      >
        <div className="forgot-password">
          <div className="modal__control">
            <h3 className="title-3">
              {t("components.forgotPassword.title")}
            </h3>
            <button className="modal__close" type="button" aria-label="Close modal" onClick={closeModal}>
              <img src={close} alt="Close" />
            </button>
          </div>
          {renderStageContent()}
        </div>
      </Modal>
    </>
  );
};
