import React, { createContext, useContext, useState, ReactNode } from "react";

import { GlobalModal } from "../components/global-modal/GlobalModal";

import { ModalState } from "../types/modal";

interface ModalContextProps {
  showModal: (title: string, text: string, state: ModalState) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; text: string; state: ModalState }>({
    title: '',
    text: '',
    state: 'success',
  });

  const showModal = (title: string, text: string, state: ModalState) => {
    setModalContent({ title, text, state });
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
