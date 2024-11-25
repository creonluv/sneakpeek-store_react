import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import Avatar from "react-avatar-edit";

import { Profile } from "../../types/Profile";

import noPhoto from "../../assets/img/no-photo.jpg";
import close from "../../assets/img/icons/close.svg";

import styles from "./UploadAvatar.module.scss";

interface UploadAvatarProps {
  profile: Profile,
  setIsImageChanged: (value: boolean) => void,
  src: string | undefined,
  preview: string | undefined,
  setSrc: (value: string | undefined) => void,
  setPreview: (value: string | undefined) => void,
  imageUrl: string | null
}

Modal.setAppElement('#root');

export const UploadAvatar: React.FC<UploadAvatarProps> = ({ profile, setIsImageChanged, src, preview, setSrc, setPreview, imageUrl }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

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
    <div className={styles.avatar}>
      <img className={styles.avatar__img} src={preview || noPhoto} alt="User" onClick={openModal} />
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: { color: "black", margin: "auto", padding: "20px", width: "600px", height: "520px", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" },
        }}
        >
        <div className={styles.avatar__control}>
          <h3 className={`${styles.avatar__title} title-3`}>Update image</h3>
          <img className={styles.avatar__close} src={close} alt="Close" onClick={closeModal} />
        </div>
        <Avatar
          width={558}
          imageWidth={420}
          height={420}
          onCrop={onCrop}
          onClose={onClose}
          src={profile?.image ? undefined : src}
          mimeTypes="image/*"
        />
      </Modal>
    </div>
  );
};
