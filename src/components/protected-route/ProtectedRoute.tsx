import { Navigate, useOutlet } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuth } = useAuthContext();
  const outlet = useOutlet();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return outlet;
};

export default ProtectedRoute;
