import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "./navbar/NavBar";
import { menuRoutes } from "../routes/menuRoutes";
import { Footer } from "./footer/Footer";
import styled from "styled-components/macro";
import { HeroCarousel } from "./hero/HeroCarousel";
import { NewsLetter } from "./newsletter/NewsLetter";


export const Layout = () => {

  //Render de Hero en Home
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isHome = currentRoute?.id === "home";


  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1400);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Wrapper>
      <NavBar />

      <HeroWrapper>{isHome && <HeroCarousel />}</HeroWrapper>

      <OutletWrapper isHome={isHome}>
        <Outlet />
      </OutletWrapper>

      <NewsLetter />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
`;
const OutletWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  margin: 0 auto;
  margin-top: ${({ isHome }) => (isHome ? "0" : "200px")};
`;
const HeroWrapper = styled.div`
  margin-bottom: 30px;
  max-height: 800px;
  @media (max-width: 68rem) {
    margin-bottom: 100px;
  }
`;

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   height: 470px;
//   margin-left: 35px;
// `;
