import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const NavBar = () => {
  //Almacenar scroll data
  const [scroll, setScroll] = useState("not-scrolled");

  //funcion para darle efecto al navbar al scrollear 12% de la pantalla
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.innerHeight * 0.12; // 10% of screen height
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

  const { getTotalItems } = useContext(CartContext);

  const totalItems = getTotalItems();

  return (
    <>
      <HeaderWrapper>
        <Nav scrolled={scroll}>
          <InsideNav>
            <LogoDiv scrolled={scroll}>
              <LogoLink to="/">
                <Logo src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771276/web%20access/samples%20for%20e-commerce/Logos/2023-07-14_09h48_23-removebg-preview_yq3phy.png"></Logo>
              </LogoLink>
            </LogoDiv>

            <NavListWrapper>
              <NavList>
                <NavLink to="/" scrolled={scroll}>
                  home
                </NavLink>
              </NavList>
              <NavList>
                <NavLink to="/all-products" scrolled={scroll}>
                  products
                </NavLink>
              </NavList>
              <NavList>
                <NavLink to="/category/shoes" scrolled={scroll}>
                  shoes
                </NavLink>
              </NavList>
              <NavList>
                <NavLink to="/category/pants" scrolled={scroll}>
                  pants
                </NavLink>
              </NavList>
              <NavList>
                <NavLink to="/category/shirts" scrolled={scroll}>
                  shirts
                </NavLink>
              </NavList>
            </NavListWrapper>

            <CartWidget
              scrolled={scroll}
              sx={{ padding: "10px" }}
              totalItems={totalItems}
            />
          </InsideNav>
        </Nav>
      </HeaderWrapper>
    </>
  );
};
const HeaderWrapper = styled.header`
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
`;
const Nav = styled.nav`
  height: ${(props) => (props.scrolled === "scrolled" ? "65px" : "90px")};
  transition: height
    ${(props) => (props.scrolled === "scrolled" ? "0.24s" : "0.16s")}
    ease-in-out;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid black; */
  position: fixed;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 0px 10px;
  &:before {
    content: "";
    position: absolute;
    bottom: -3.5px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: black;
    display: ${(props) => (props.scrolled === "scrolled" ? "none" : "block")};
  }
`;
const InsideNav = styled.div`
  width: 100vw;
  max-width: 1300px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;
const LogoDiv = styled.div`
  width: ${(props) => (props.scrolled === "scrolled" ? "90px" : "120px")};
  transition: width
    ${(props) => (props.scrolled === "scrolled" ? "0.28s" : "0.16s")}
    ease-in-out;
`;
const LogoLink = styled(Link)`
  text-decoration: none;
`;
const Logo = styled.img`
  width: 65%;
  margin-left: 12px;
`;
const NavListWrapper = styled.ul`
  display: flex;
  list-style: none;
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
    props.scrolled === "scrolled" ? ".75rem" : "0.82rem"};
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
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.21s ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
//El otro nav
// const NavLink = styled(Link)`
//   text-decoration: none;
//   color: black;
//   font-weight: 700;
//   text-transform: uppercase;
//   position: relative;
//   font-size: ${(props) => (props.scrolled === "scrolled" ? ".85rem" : "1rem")};
//   transition: font-size
//     ${(props) => (props.scrolled === "scrolled" ? "0.28s" : "0.16s")}
//     ease-in-out;
//   &:hover {
//     color: #7c819b ;
//     transition: ease-in-out 0.2s;
//     transform: scaleX(1);
//   }
//   &::after {
//     content: "";
//     position: absolute;
//     bottom: -4px;
//     left: 0;
//     width: 100%;
//     height: 2px;
//     background-color: black;
//     transform: scaleX(0);
//     transform-origin: left center;
//     transition: transform 0.25s ease-in-out, padding-bottom 0.25s ease-in-out;
//   }
//   &:hover::after {
//     background-color: #373a4a;
//     transform: scaleX(1);
//     padding-bottom: 3px;
//   }
// `;
