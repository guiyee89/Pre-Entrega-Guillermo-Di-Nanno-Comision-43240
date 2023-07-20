import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./navbar/NavBar";
import { menuRoutes } from "../routes/menuRoutes";
import { Footer } from "./footer/Footer";
import styled from "styled-components/macro";
import { HeroCarousel } from "../pages/landingPage/carousels/HeroCarousel";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";

export const Layout = () => {

  //Loader
  const [loading, setLoading] = useState(true);

  //Render de Hero en Home
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isHome = currentRoute?.id === "home";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <Wrapper>
      <NavBar />
      {loading ? (
        <LoaderWrapper>
          <BarLoader color="#12352e" width={250} />
        </LoaderWrapper>
      ) : (
        <HeroWrapper>{isHome && <HeroCarousel />}</HeroWrapper>
      )}
      <OutletWrapper isHome={isHome}>
        <Outlet />
      </OutletWrapper>

      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
`;
const OutletWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ isHome }) => (isHome ? "0" : "200px")};
`;
const HeroWrapper = styled.div`
  margin-bottom: 200px;
  @media (max-width: 68rem) {
    margin-bottom: 100px;
  }
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 470px;
  margin-left: 35px;
`;