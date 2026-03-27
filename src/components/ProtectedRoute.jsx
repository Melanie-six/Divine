import axios from 'axios';
import { useEffect, useState } from 'react';
// import { RotatingSquare } from "react-loader-spinner";
import { Navigate } from 'react-router';
import LoadingPage from './LoadingPage';

const API_BASE = import.meta.env.VITE_API_BASE;

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }

    const checkLogin = async () => {
      try {
        await axios.post(`${API_BASE}/api/user/check`);
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        console.error(error.response);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}
export default ProtectedRoute;
