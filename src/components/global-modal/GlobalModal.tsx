import Modal from 'react-modal';

import { useWindowSizeContext } from '../../context/WindowSizeContext';

import { ModalState } from '../../types/modal';

import close from "../../assets/img/icons/close.svg";
import success from "../../assets/img/icons/checkmark.svg";
import warning from "../../assets/img/icons/warning.svg";
import error from "../../assets/img/icons/error.svg";

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

  return (
    <Modal
      isOpen={true}
      onRequestClose={hideModal}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 },
        content: {
          width: Math.min(width, 500) - 24,
          overflowY: "auto",
          margin: 'auto',
          inset: "12px",
          zIndex: 1000,
          height: "min-content"
        },
      }}
    >
      <div className="modal">
        <img className={`modal__img ${state}`} src={
          state === "success" ? success :
            state === "warning" ? warning :
              error
        } alt={state} />
        <div className="modal__block">
          <div className="modal__control">
            <h3 className="modal__title title-3">{title}</h3>
            <img className="modal__close" src={close} alt="Close" onClick={hideModal} />
          </div>
          <p>{description}</p>
        </div>
      </div>
    </Modal>
  );
};
