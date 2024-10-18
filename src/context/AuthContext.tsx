import React, { createContext, useContext, useState, ReactNode } from "react";

// Тип для AuthContext
type AuthContextType = {
  isAuth: boolean;
  signin: () => void;
  signout: () => void;
};

// Створення контексту з початковим значенням undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер контексту
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const signin = () => setIsAuth(true);
  const signout = () => setIsAuth(false);

  return <AuthContext.Provider value={{ isAuth, signin, signout }}>{children}</AuthContext.Provider>;
};

// Кастомний хук для використання контексту
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
