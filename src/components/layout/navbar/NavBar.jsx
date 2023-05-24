import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";

const NavBar = () => {
  return (
    <>
      <Wrapper>
        <Header>
          <Logo href="#">WeShop</Logo>
          <NavLinks>
            <NavList>
              <Link href="#">Home</Link>
            </NavList>
            <NavList>
              <Link href="#">Products</Link>
            </NavList>
            <NavList>
              <Link href="#">About Us</Link>
            </NavList>
            <NavList>
              <Link href="#">Contact</Link>
            </NavList>
          </NavLinks>
          <CartWidget sx={{ padding: "10px" }} />
        </Header>
      </Wrapper>
    </>
  );
};
export default NavBar;
const Wrapper = styled.div`
    background-color: #6b88bb;
`

const Header = styled.header`
  min-height: 100px;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  position: relative;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .75);
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
const Logo = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 800;
  font-size: 1.5rem;
  margin-left: 16px;
`;
const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;
const NavList = styled.li`
  padding: 15px;
`;
const Link = styled.a`
  text-decoration: none;
  font-size:1.2rem;
  color: black;
  font-weight: 500;
`;
