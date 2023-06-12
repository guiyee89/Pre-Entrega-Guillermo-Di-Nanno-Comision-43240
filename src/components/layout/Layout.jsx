import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
