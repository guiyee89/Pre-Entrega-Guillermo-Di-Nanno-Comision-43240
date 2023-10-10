import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { menuRoutes } from "../../routes/menuRoutes";


export const NavDesktop = () => {
  //////////        ////////////        ////////////        ///////////
  //                       CartContext                      //
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();

  //////////        ////////////        ////////////        ///////////
  //                       Scroll Effect                      //
  const [scroll, setScroll] = useState("not-scrolled");
  //funcion para darle efecto al navbar al scrollear 12% de la pantalla
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.innerHeight * 0.05; // 10% of screen height
      if (window.scrollY > scrollHeight) {
        setScroll("scrolled");
      } else {
        setScroll("not-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //////////        ////////////        ////////////        ///////////
  //                 Reset localStorage on nav links               //
  const handleNavLinkClick = () => {
    localStorage.removeItem("selectedFilters");
    localStorage.removeItem("currentPage");
  };

  //Find "Home" and "ItemDetail" locations
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isCart = currentRoute?.id === "cart";

  return (
    <>
      <HeaderWrapper>
        <Nav scrolled={scroll}>
          <InsideNav isCart={isCart}>
            <LogoDiv scrolled={scroll} onClick={handleNavLinkClick}>
              <LogoLink to="/">
                <Logo src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771276/web%20access/samples%20for%20e-commerce/Logos/2023-07-14_09h48_23-removebg-preview_yq3phy.png"></Logo>
              </LogoLink>
            </LogoDiv>

            {!isCart && (
              <>
                <NavListWrapper>
                  <NavList>
                    <NavLink
                      to="/"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      home
                    </NavLink>
                  </NavList>
                  <NavList>
                    <NavLink
                      to="/all-products"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      products
                    </NavLink>
                  </NavList>
                  <NavList>
                    <NavLink
                      to="/category/shoes"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      shoes
                    </NavLink>
                  </NavList>
                  <NavList>
                    <NavLink
                      to="/category/pants"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      pants
                    </NavLink>
                  </NavList>
                  <NavList>
                    <NavLink
                      to="/category/shirts"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      shirts
                    </NavLink>
                  </NavList>
                </NavListWrapper>

                <CartWidget
                  scrolled={scroll}
                  sx={{ padding: "10px" }}
                  totalItems={totalItems}
                />
              </>
            )}
          </InsideNav>
        </Nav>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  position: relative;
`;
const Nav = styled.nav`
  height: ${(props) => (props.scrolled === "scrolled" ? "65px" : "90px")};
  transition: height
    ${(props) => (props.scrolled === "scrolled" ? "0.16s" : "0.16s")}
    ease-in-out;
  width: 100%;
  margin: 0 auto;
  display: flex;
  position: fixed;
  z-index: 1;
  background-color: rgb(253 253 253);
  box-shadow: ${(props) =>
    props.scrolled === "scrolled" ? "none" : "rgba(0, 0, 0, 0.55) 0px 0px 3px"};
  border-bottom: ${(props) =>
    props.scrolled === "scrolled"
      ? "1px solid rgb(133 132 132 / 25%)"
      : "none"};
`;
const InsideNav = styled.div`
  width: 100vw;
  max-width: 1548px;
  display: flex;
  margin: 0px auto;
  padding: 0px 20px 0 20px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: ${({ isCart }) => (isCart ? "center" : "space-between")};
  @media screen and (max-width: 50rem) {
    padding: 0;
    justify-content: flex-end;
  }
`;
const LogoDiv = styled.div`
  width: ${(props) => (props.scrolled === "scrolled" ? "90px" : "110px")};
  transition: width
    ${(props) => (props.scrolled === "scrolled" ? "0.20s" : "0.16s")}
    ease-in-out;
  @media screen and (max-width: 50rem) {
    position: absolute;
    left: 42%;
  }
`;
const LogoLink = styled(Link)`
  text-decoration: none;
`;
const Logo = styled.img`
  width: 62%;
  margin-left: 12px;
  @media screen and (max-width: 50rem) {
    width: 50%;
  }
`;
const NavListWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: -21px;
  @media screen and (max-width: 50rem) {
    display: none;
  }
`;
const NavList = styled.li`
  padding: 0 20px;
`;
const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  font-size: ${(props) =>
    props.scrolled === "scrolled"
      ? ".68rem"
      : "clamp(0.62rem, 2vw + 1px, 0.72rem);"};
  background-image: linear-gradient(to right, transparent 0%, #ecf0f8 100%);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position: left bottom;
  transition: background-size 0.2s ease-in-out, font-size 0.2s ease-in-out,
    color 0.2s ease-in-out;
  &:hover {
    color: #68719d;
    background-size: 100% 100%;
  }
  &:active {
    color: #fafafa;
    transition: background-color 0.05s ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0px;
    width: 100%;
    height: 1.1px;
    background-color: black;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.21s ease-in-out;
  }
`;
