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



export const Layout = () => {


//Flash loading effect
const loading = useGlobalLoader();

//Restore scroll to top on navigation
  useScrollRestoration();

//Find "Home" and "ItemDetail" locations
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isHome = currentRoute?.id === "home";
  const isItemDetail = useMatch("/item-details/:id");



// useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1400);

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <Wrapper>
    {loading ? (
      <LoadingScreen />
    ) : (
      <>
        <NavBar />
        {!isHome && /* !isItemDetail && */ <HeroSmall />}
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
`;
const LoadingScreen = styled.div`
  max-height: 100vh;
`
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