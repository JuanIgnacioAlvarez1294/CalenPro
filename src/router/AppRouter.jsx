import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from '../calendar';
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthToken();
  }, []);

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (status === 'not-authenticated') {
      navigate('/auth/login');
    }
  }, [status]);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

