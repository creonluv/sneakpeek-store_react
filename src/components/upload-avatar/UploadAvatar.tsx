import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Avatar from "react-avatar-edit";
import { useTranslation } from "react-i18next";

import { useWindowSizeContext } from "../../context/WindowSizeContext";

import { Profile } from "../../types/Profile";

import noPhoto from "../../assets/img/no-photo.jpg";
import close from "../../assets/img/icons/close.svg";

import "./UploadAvatar.scss";

interface UploadAvatarProps {
  profile: Profile;
  setIsImageChanged: (value: boolean) => void;
  src: string | undefined;
  preview: string | undefined;
  setSrc: (value: string | undefined) => void;
  setPreview: (value: string | undefined) => void;
  imageUrl: string | null;
}

Modal.setAppElement("#root");

const DEFAULT_SIZE = 500;
const CONTROL_HEIGHT = 51;
const OFFSET_INLINE = 32;
const PADDING_INLINE = 40;
const BOTTOM_NAV_HEIGHT = 70;

export const UploadAvatar: React.FC<UploadAvatarProps> = ({
  profile,
  setIsImageChanged,
  src,
  preview,
  setSrc,
  setPreview,
  imageUrl,
}) => {
  const { t } = useTranslation();
  const { width, height } = useWindowSizeContext();
  let modalSize = Math.min(width - OFFSET_INLINE, height - OFFSET_INLINE - CONTROL_HEIGHT - (width < 768 ? BOTTOM_NAV_HEIGHT : 0), DEFAULT_SIZE);
  let avatarSize = modalSize - PADDING_INLINE;

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
    document.body.classList.add("_lock");
  };

  const closeModal = () => {
    setIsOpenModal(false);
    document.body.classList.remove("_lock");
  };

  const onClose = (): void => {
    setPreview(src);
    setIsImageChanged(false);
  };

  const onCrop = (view: string): void => {
    setPreview(view);
    setIsImageChanged(true);
  };

  useEffect(() => {
    setSrc(imageUrl || "");
    setPreview(imageUrl || "");
  }, [profile]);

  return (
    <div className="avatar">
      <img className="avatar__img" src={preview || noPhoto} alt="User" onClick={openModal} />
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 },
          content: {
            color: "black",
            marginInline: "auto",
            padding: "20px",
            width: modalSize,
            height: modalSize + CONTROL_HEIGHT,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            inset: "16px",
            overflowY: "auto",
          },
        }}
      >
        <div className="avatar__control">
          <h3 className="avatar__title title-3">{t("components.upload")}</h3>
          <img className="avatar__close" src={close} alt="Close" onClick={closeModal} />
        </div>
        <Avatar
          width={avatarSize}
          height={avatarSize - 1.6}
          imageWidth={avatarSize}
          onCrop={onCrop}
          onClose={onClose}
          src={profile?.image ? undefined : src}
          mimeTypes="image/*"
        />
      </Modal>
    </div>
  );
};
