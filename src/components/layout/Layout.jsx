import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./navbar/NavBar";
import { Hero } from "./hero/Hero";
import { menuRoutes } from "../routes/menuRoutes";
import { Footer } from "./footer/Footer";
import styled from "styled-components/macro";

export const Layout = () => {
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );

  const isHome = currentRoute?.id === "home";

  return (
    <Wrapper>

      <NavBar />

      <HeroWrapper>
        {isHome && <Hero />}
      </HeroWrapper>

      <OutletWrapper isHome={isHome}>
        <ItemListTitle>All Our Products</ItemListTitle>
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
  margin-bottom: 160px;
`
const ItemListTitle = styled.h1`
  width: 100%;
  color: #2b2929;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
`