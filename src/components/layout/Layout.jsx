import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer";
import { NavBar } from "./navbar/NavBar";
import { Hero } from "./hero/Hero";


export const Layout = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Outlet />
      <Footer />
    </div>
  );
};
