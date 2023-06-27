import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <HeaderWrapper>
        <Nav>
          <LogoDiv>
            <LogoLink to="/">
              <Logo src="https://res.cloudinary.com/derdim3m6/image/upload/v1686957140/web%20access/weshop_logo_original_oefa0e.png"></Logo>
            </LogoLink>
          </LogoDiv>

          <NavWrapper>
            <NavList>
              <Links to="/">productos</Links>
            </NavList>
            <NavList>
              <Links to="/category/camisas">camisas</Links>
            </NavList>
            <NavList>
              <Links to="/category/pantalones">pantalones</Links>
            </NavList>
            <NavList>
              <Links to="/category/calzado">calzado</Links>
            </NavList>
          </NavWrapper>

          <CartWidget sx={{ padding: "10px" }} />
        </Nav>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  background-color: #f4f4f4;
`;

const Nav = styled.nav`
  min-height: 80px;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  position: relative;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.75);
  &:before {
    content: "";
    position: absolute;
    bottom: -7px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: black;
  }
`;
const LogoDiv = styled.div`
`;
const LogoLink = styled(Link)`
 text-decoration: none;
`;
const Logo = styled.img`
  width: 120px;
  margin-left: 12px;
`;
const NavWrapper = styled.ul`
  display: flex;
  list-style: none;
`;
const NavList = styled.li`
  padding: 15px;
`;
const Links = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
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
    /* display: none; */
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.25s ease-in-out, padding-bottom 0.25s ease-in-out;
  }
  &:hover::after {
    background-color: #373a4a;
    /* display: block; */
    transform: scaleX(1);
    padding-bottom: 3px;
  }
`;
