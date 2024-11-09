import { Navigate, useOutlet } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

import { useEffect, useState } from 'react';
import { getBucket } from "../../api/bucket";

const ProtectedRoute = () => {
  const { isAuth, signin, signout } = useAuthContext();
  const outlet = useOutlet();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const sizes = await getBucket();
        if (sizes) {
          signin();
        } else {
          signout();
        }
      } catch (error) {
        console.error("Error fetching sizes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSizes();
  }, [signin, signout]);

  if (isLoading) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return outlet;
};

export default ProtectedRoute;
