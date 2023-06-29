import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const NavBar = () => {
  //

  //Darle efecto copado al NavBar
  const [scroll, setScroll] = useState();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.innerHeight * 0.12; // 10% of screen height
      if (window.scrollY > scrollHeight) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { getTotalItems } = useContext(CartContext)

  const totalItems = getTotalItems()

  return (
    <>
    <HeaderWrapper>
      <Nav isscrolled={scroll}> 
        <LogoDiv isscrolled={scroll}> 
          <LogoLink to="/">
            <Logo
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1686957140/web%20access/weshop_logo_original_oefa0e.png"
            ></Logo>
          </LogoLink>
        </LogoDiv>

        <NavWrapper>
          <NavList>
            <NavLink to="/" isscrolled={scroll}>productos</NavLink> 
          </NavList>
          <NavList>
            <NavLink to="/category/camisas" isscrolled={scroll}>camisas</NavLink> 
          </NavList>
          <NavList>
            <NavLink to="/category/pantalones" isscrolled={scroll}>pantalones</NavLink> 
          </NavList>
          <NavList>
            <NavLink to="/category/calzado" isscrolled={scroll}>calzado</NavLink> 
          </NavList>
        </NavWrapper>

        <CartWidget isscrolled={scroll} sx={{ padding: "10px" }} totalItems={totalItems}/>
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
  height: ${(props) => (props.isscrolled ? "65px" : "120px")};
  transition: height ${(props) => (props.isscrolled ? "0.24s" : "0.16s")}
    ease-in-out;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  position: fixed;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.75);
  &:before {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: black;
    display: ${(props) => (props.isscrolled ? "none" : "block")};
  }
`;
const LogoDiv = styled.div`
  width: ${(props) => (props.isscrolled ? "90px" : "120px")};
  transition: width ${(props) => (props.isscrolled ? "0.28s" : "0.16s")}
    ease-in-out;
`;
const LogoLink = styled(Link)`
  text-decoration: none;
`;
const Logo = styled.img`
  width: 100%;
  margin-left: 12px;
`;
const NavWrapper = styled.ul`
  display: flex;
  list-style: none;
`;
const NavList = styled.li`
  padding: 15px;
`;
const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  font-size: ${(props) => (props.isscrolled ? ".85rem" : "1rem")};
  transition: font-size ${(props) => (props.isscrolled ? "0.28s" : "0.16s")}
    ease-in-out;
  &:hover {
    color: #7c819b;
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
    transition: transform 0.25s ease-in-out, padding-bottom 0.25s ease-in-out;
  }
  &:hover::after {
    background-color: #373a4a;
    transform: scaleX(1);
    padding-bottom: 3px;
  }
`;
