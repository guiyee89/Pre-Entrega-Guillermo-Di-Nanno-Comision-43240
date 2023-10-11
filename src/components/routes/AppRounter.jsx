import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { menuRoutes } from "./menuRoutes";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { LoginContainer } from "../pages/dashboard/authentication/login/LoginContainer";
import { SignUpContainer } from "../pages/dashboard/authentication/signup/SignUpContainer";
import { ForgotPassword } from "../pages/dashboard/authentication/forgotPass/ForgotPassword";
import { ProtectedAdmin } from "./ProtectedAdmin";

export const AppRounter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {menuRoutes.map(({ id, path, Element }) => (
          <Route key={id} path={path} element={<Element />} />
        ))}
      </Route>

            
      <Route element={<ProtectedAdmin />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/login" element={<LoginContainer />} />

      <Route path="/signup" element={<SignUpContainer />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<h1>404 not found</h1>} />
    </Routes>
  );
};
