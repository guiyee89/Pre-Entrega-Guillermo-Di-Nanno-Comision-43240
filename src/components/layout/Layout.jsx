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
import { SideMenuContext } from "../context/SideMenuContext";
import { NavMobile } from "./navbar/NavMobile";
////////////////////////////////////////////////////

export const Layout = () => {
  ////////////////////////////////////////////////////

  //Flash loading effect
  const loading = useGlobalLoader();

  ////////////////////////////////////////////////////

  //Restore scroll to top on navigation
  useScrollRestoration();

  ////////////////////////////////////////////////////

  //SideMenu Context
  const { isOpen, isMenuOpen, isFilterOpen } = useContext(SideMenuContext);

  ////////////////////////////////////////////////////

  //Manage Mobile - Desktop components by width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  ////////////////////////////////////////////////////

  // Prevent scrolling when the SideCart is open
  useEffect(() => {
    if (isOpen && isMenuOpen && isFilterOpen) {
      document.body.style.overflow = "inherit";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen, isMenuOpen, isFilterOpen]);

  ////////////////////////////////////////////////////

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
    <>
      <Wrapper
        isOpen={isOpen}
        isMenuOpen={isMenuOpen}
        isFilterOpen={isFilterOpen}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {windowWidth > 900 && <NavBar />}
            {windowWidth <= 900 && <NavMobile />}
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
    </>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  overflow-x: clip;
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
  /* max-width: 1618px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: rgb(253 253 253);
  padding-top: 35px;
  @media (max-width: 68rem) {
    padding-top: 0;
  }
`;
const HeroWrapper = styled.div`
  background-color: white;
  @media (max-width: 68rem) {
    margin-bottom: 25px;
  }
`;
