import { useState } from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

import { useModalContext } from "../../context/ModalContext";
import { useWindowSizeContext } from "../../context/WindowSizeContext";

import { changePassword } from "../../api/user";

import { ChangePasswordMessages } from "../../shared/utils/modalMessages";

import close from "../../assets/img/icons/close.svg";

import "./ChangePassword.scss";

interface PasswordData {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

Modal.setAppElement("#root");

const DEFAULT_SIZE = 500;
const OFFSET_INLINE = 32;
const BOTTOM_NAV_HEIGHT = 70;

export const ChangePassword = () => {
  const { t } = useTranslation();
  const { showModal } = useModalContext();
  const { width, height } = useWindowSizeContext();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState<PasswordData>({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const openModal = () => {
    setIsOpenModal(true);
    document.body.classList.add("_lock");
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.classList.remove("_lock");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { old_password, new_password, confirm_new_password } = formData;

    try {
      if (!old_password || !new_password || !confirm_new_password) {
        showModal(ChangePasswordMessages.ALL_FIELDS_REQUIRED);
        return;
      }

      if (new_password !== confirm_new_password) {
        showModal(ChangePasswordMessages.INVALID_PASSWORD_CONFIRMATION);
        return;
      }

      await changePassword({ old_password, new_password });
      showModal(ChangePasswordMessages.CHANGE_PASSWORD_SUCCESS);
    } catch (error) {
      showModal(ChangePasswordMessages.CHANGE_PASSWORD_ERROR);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <div className="button-wrapper">
        <button className="profile__button_cp button button_sm button_default" onClick={openModal}>
          <span>{t("components.changePassword.title")}</span>
        </button>
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 },
          content: {
            color: "black",
            margin: "auto",
            padding: "20px",
            width: Math.min(width - OFFSET_INLINE, DEFAULT_SIZE),
            height: Math.min(height - OFFSET_INLINE - (width < 768 ? BOTTOM_NAV_HEIGHT + 60 : 0)),
            maxHeight: "380px",
            inset: "16px"
          },
        }}
      >
        <div className="changepassword__control">
          <h3 className="changepassword__title title-3">
            {t("components.changePassword.title")}
          </h3>
          <img
            className="changepassword__close"
            src={close}
            alt="Close"
            onClick={closeModal}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="group">
            <input
              id="old_password"
              className="input"
              placeholder={t("components.changePassword.oldPassword")}
              name="old_password"
              value={formData.old_password}
              type="password"
              onChange={handleChange}
            />
            <input
              id="new_password"
              className="input"
              placeholder={t("components.changePassword.newPassword")}
              name="new_password"
              value={formData.new_password}
              type="password"
              onChange={handleChange}
            />
            <input
              id="confirm_new_password"
              className="input"
              placeholder={t("components.changePassword.confirmNewPassword")}
              name="confirm_new_password"
              value={formData.confirm_new_password}
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="changepassword__button">
            <button
              className="button button_lg button_default button_full-size"
              type="submit"
            >
              {t("components.changePassword.button")}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
