import Modal from 'react-modal';

import { useWindowSizeContext } from '../../context/WindowSizeContext';

import { ModalState } from '../../types/modal';

import close from "../../assets/img/icons/close.svg";

import "../../shared/commonStyles/modal.scss";

interface GlobalModalProps {
  title: string;
  description: string;
  state: ModalState;
  hideModal: () => void;
}

Modal.setAppElement('#root');

export const GlobalModal = ({ title, description, state, hideModal }: GlobalModalProps) => {
  const { width } = useWindowSizeContext();

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
        overlay: { zIndex: 1000 },
        content: {
          width: Math.min(width, 500) - 24,
          overflowY: "auto",
          margin: 'auto',
          inset: "12px",
          zIndex: 1000,
          ...getStateStyle(),
        },
      }}
    >
      <div className="modal__control">
        <h3 className="modal__title title-3">{title}</h3>
        <img className="modal__close" src={close} alt="Close" onClick={hideModal} />
      </div>
      <p>{description}</p>
    </Modal>
  );
};
