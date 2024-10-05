import React, { createContext, useContext, useState, ReactNode } from "react";

type AsideContextType = {
  isAsideOpen: boolean;
  toggleAside: () => void;
};

const AsideContext = createContext<AsideContextType | undefined>(undefined);

export const AsideProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleAside = () => {
    setIsAsideOpen((prev) => !prev);
  };

  return (
    <AsideContext.Provider value={{ isAsideOpen, toggleAside }}>
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
