import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./navbar/NavBar";
import { menuRoutes } from "../routes/menuRoutes";
import { Footer } from "./footer/Footer";
import styled from "styled-components/macro";
import { HeroCarousel } from "./carousels/HeroCarousel";


export const Layout = () => {

  //Render de Hero en Home
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isHome = currentRoute?.id === "home"; 


  return (
    <Wrapper>
      
      <NavBar />

      <HeroWrapper>
        {isHome && <HeroCarousel />}
      </HeroWrapper>

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
  margin-top: ${({ isHome }) => (isHome ? "0" : "200px")};
`;
const HeroWrapper = styled.div`
  margin-bottom: 200px;
  @media (max-width:68rem) {
    margin-bottom: 100px;
  }
`
