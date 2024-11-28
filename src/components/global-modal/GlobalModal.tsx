import Modal from 'react-modal';

import { ModalState } from '../../types/modal';

import close from "../../assets/img/icons/close.svg";

import styles from "./GlobalModal.module.scss";

interface GlobalModalProps {
  title: string;
  description: string;
  state: ModalState;
  hideModal: () => void;
}

Modal.setAppElement('#root');

export const GlobalModal = ({ title, description, state, hideModal }: GlobalModalProps) => {
  const getStateStyle = () => {
    switch (state) {
      case 'error':
        return { borderColor: 'red', backgroundColor: '#ffe6e6', height: "min-content" };
      case 'warning':
        return { borderColor: 'orange', backgroundColor: '#fff4e6', height: "min-content" };
      case 'success':
        return { borderColor: 'green', backgroundColor: '#e6ffe6', height: "min-content" };
      default:
        return {};
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={hideModal}
      style={{
        content: {
          width: '400px',
          margin: 'auto',
          ...getStateStyle(),
        },
      }}
    >
      <div className={styles.modal__control}>
        <h3 className={`${styles.modal__title} title-3`}>{ title }</h3>
        <img className={styles.modal__close} src={close} alt="Close" onClick={hideModal} />
      </div>
      <p>{ description }</p>
    </Modal>
  );
};
