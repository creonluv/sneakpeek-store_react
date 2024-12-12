import { useState, useEffect } from "react";
import { Navigate, useOutlet } from "react-router-dom";

import { checkAuth } from "../../api/auth";

import { useAuthContext } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuth, signin, signout } = useAuthContext();
  const outlet = useOutlet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = async () => {
      try {
        setIsLoading(true);
        await checkAuth();
        signin();
      } catch (error) {
        signout();
      } finally {
        setIsLoading(false);
      }
    };

    query();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return outlet;
};
