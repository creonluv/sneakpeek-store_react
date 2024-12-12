import React, { createContext, useContext, useState, ReactNode } from "react";

type AsideContextType = {
  isAside: boolean;
  openAside: () => void;
  closeAside: () => void;
};

const AsideContext = createContext<AsideContextType | undefined>(undefined);

export const AsideProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAside, setIsAside] = useState(false);
  const openAside = () => {
    setIsAside(true);
    document.body.classList.add("_lock");
  };
  const closeAside = () => {
    setIsAside(false);
    document.body.classList.remove("_lock");
  };

  return (
    <AsideContext.Provider value={{ isAside, openAside, closeAside }}>
      {children}
    </AsideContext.Provider>
  );
};

export const useAsideContext = () => {
  const context = useContext(AsideContext);
  if (!context) {
    throw new Error("useAsideContext must be used within an AsideProvider");
  }
  return context;
};
