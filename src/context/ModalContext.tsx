import React, { createContext, useContext, useState, ReactNode } from "react";

import { GlobalModal } from "../components/global-modal/GlobalModal";

import { getModalMessages } from "../shared/utils/modalMessages";

import { ModalState } from "../types/modal";
import { messages } from "../shared/utils/modalMessages";

interface ModalContextProps {
  showModal: (message: messages) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; description: string; state: ModalState }>({
    title: '',
    description: '',
    state: 'success',
  });

  const showModal = (message: messages) => {
    const { title, description, state } = getModalMessages(message);
    setModalContent({ title, description, state });
    setIsOpen(true);  
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isOpen && <GlobalModal {...modalContent} hideModal={hideModal} />}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within an ModalProvider");
  }
  return context;
};
