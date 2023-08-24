import { Outlet, useLocation, useMatch } from "react-router-dom";
import { NavBar } from "./navbar/NavBar";
import { menuRoutes } from "../routes/menuRoutes";
import { Footer } from "./footer/Footer";
import styled from "styled-components/macro";
import { HeroLanding } from "./hero/HeroLanding";
import { NewsLetter } from "./newsletter/NewsLetter";
import useScrollRestoration from "../hooks/useScrollRestoration";
import { useGlobalLoader } from "../hooks/useGlobalLoader";
import { HeroSmall } from "./hero/HeroSmall";
import { SideCart } from "../pages/cart/SideCart";
import { useContext, useEffect, useState } from "react";
import { SideCartContext } from "../context/SideCartContext";

export const Layout = () => {
  //Flash loading effect
  const loading = useGlobalLoader();

  //Restore scroll to top on navigation
  useScrollRestoration();

  const { isOpen } = useContext(SideCartContext);//SideCart Context

  useEffect(() => {
    // Prevent scrolling when the SideCart is open
    if (isOpen) {
      document.body.style.overflow = "inherit";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  //Find "Home" and "ItemDetail" locations
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isHome = currentRoute?.id === "home";
  /* const isItemDetail = useMatch("/item-details/:id"); */


  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1400);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Wrapper isOpen={isOpen}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <NavBar />
          <SideCart />
          {!isHome && <HeroSmall />}
          <HeroWrapper>{isHome && <HeroLanding />}</HeroWrapper>

          <OutletWrapper isHome={isHome}>
            <Outlet />
          </OutletWrapper>

          <NewsLetter />
          <Footer />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  /* overflow-y: ${({ isOpen }) => (isOpen ? "inherit" : "hidden")};  */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;
const LoadingScreen = styled.div`
  max-height: 100vh;
`;
const OutletWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: rgb(253 253 253);
  padding-top: 35px;

`;
const HeroWrapper = styled.div`
  max-height: 800px;
  @media (max-width: 68rem) {
    margin-bottom: 60px;
  }
`;
