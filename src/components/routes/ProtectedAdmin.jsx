import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedAdmin = () => {
  const { user } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;
  const rolAdmin2 = import.meta.env.VITE_ROL_ADMIN2;

  return (
    <>
      {user.rol === rolAdmin || user.rol === rolAdmin2 ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
