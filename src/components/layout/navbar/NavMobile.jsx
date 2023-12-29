import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import CloseIcon from "@mui/icons-material/Close";
import { menuRoutes } from "../../routes/menuRoutes";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const NavMobile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;
  const rolAdmin2 = import.meta.env.VITE_ROL_ADMIN2;
  //////////        ////////////        ////////////        ///////////
  //                       CartContext                      //
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();
  //////////        ////////////        ////////////        ///////////
  //                       SideMenuContext                      //
  const {
    isMenuOpen,
    toggleSideMenu,
    isFilterOpen,
    toggleDropDown,
    isDrowpDownOpen,
  } = useContext(GlobalToolsContext);

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
    localStorage.removeItem("selectedSizeOrder");
    localStorage.removeItem("selectedCategoryOrder");
    localStorage.removeItem("selectedColorOrder");
    localStorage.removeItem("currentPage");
    if (!isMenuOpen) {
      toggleSideMenu();
    }
  };

  //Find "Home" and "ItemDetail" locations
  const location = useLocation();
  const currentRoute = menuRoutes.find(
    (route) => route.path === location.pathname
  );
  const isCart = currentRoute?.id === "cart";
  const isCheckout = currentRoute?.id === "Checkout";
  const isDashboard = currentRoute?.id === "dashboard";

  return (
    <>
      <Nav scrolled={scroll} isFilterOpen={isFilterOpen}>
        <InsideNav
          isCart={isCart}
          isCheckout={isCheckout}
          isDashboard={isDashboard}
        >
          {!isCart && !isCheckout && !isDashboard && (
            <MenuIconBtn
              scrolled={scroll}
              sx={{ fontSize: "26px" }}
              onClick={toggleSideMenu}
            />
          )}
          <TransparentDiv
            isMenuOpen={isMenuOpen}
            onClick={isMenuOpen ? null : toggleSideMenu}
          />
          <SideMenuWrapper isMenuOpen={isMenuOpen}>
            <SideMenuHeader>
              <LogoSideMenu onClick={handleNavLinkClick}>
                <LogoLink to="/">
                  <LogoMenu src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771276/web%20access/samples%20for%20e-commerce/Logos/2023-07-14_09h48_23-removebg-preview_yq3phy.png"></LogoMenu>
                </LogoLink>
              </LogoSideMenu>
              <CloseIcon
                onClick={toggleSideMenu}
                sx={{
                  fontSize: "28px",
                  marginTop: "15px",
                  marginLeft: "36px",
                  cursor: "pointer",
                }}
              />
            </SideMenuHeader>
            <NavListWrapper>
              <NavList>
                <NavLink to="/" scrolled={scroll} onClick={handleNavLinkClick}>
                  home
                </NavLink>
              </NavList>
              <ProductsDropDown scrolled={scroll}>
                <OnClickDropDown
                  scrolled={scroll}
                  onClick={() => toggleDropDown(!isDrowpDownOpen)}
                >
                  products
                  <ArrowDropDownIcon sx={{ marginTop: "-2px" }} />
                </OnClickDropDown>
                <DropDown isDrowpDownOpen={!isDrowpDownOpen} scrolled={scroll}>
                  <DropDownContainer>
                    <CategoryDropDown>
                      <CategoryContainer>
                        <CategoryList>
                          <CategoryLink
                            style={{
                              fontWeight: "600",
                              fontSize: ".7rem",
                              textDecoration: "underline",
                            }}
                            to="/all-products"
                            scrolled={scroll}
                            onClick={handleNavLinkClick}
                          >
                            All Categories
                          </CategoryLink>
                        </CategoryList>
                        <CategoryList>
                          <CategoryLink
                            to="/category/shoes"
                            scrolled={scroll}
                            onClick={handleNavLinkClick}
                          >
                            shoes
                          </CategoryLink>
                        </CategoryList>
                        <CategoryList>
                          <CategoryLink
                            to="/category/pants"
                            scrolled={scroll}
                            onClick={handleNavLinkClick}
                          >
                            pants
                          </CategoryLink>
                        </CategoryList>
                        <CategoryList>
                          <CategoryLink
                            to="/category/shirts"
                            scrolled={scroll}
                            onClick={handleNavLinkClick}
                          >
                            shirts
                          </CategoryLink>
                        </CategoryList>
                        <CategoryList>
                          <CategoryLink
                            to="/category/hoodies"
                            scrolled={scroll}
                            onClick={handleNavLinkClick}
                          >
                            hoodies
                          </CategoryLink>
                        </CategoryList>
                        <CategoryList>
                          <CategoryLink
                            to="/category/bags"
                            scrolled={scroll}
                            onClick={handleNavLinkClick}
                          >
                            bags
                          </CategoryLink>
                        </CategoryList>
                      </CategoryContainer>
                    </CategoryDropDown>
                  </DropDownContainer>
                </DropDown>
              </ProductsDropDown>
              <NavList>
                <NavLink
                  to="/contact"
                  scrolled={scroll}
                  onClick={handleNavLinkClick}
                >
                  about us
                </NavLink>
              </NavList>
              <NavList>
                <NavLink
                  to="/contact"
                  scrolled={scroll}
                  onClick={handleNavLinkClick}
                >
                  contact us
                </NavLink>
              </NavList>
            </NavListWrapper>
            {user.rol === rolAdmin ||
            user.rol === rolAdmin2 ||
            user.rol === "user" ? null : (
              <LoginBtn>
                <h4>Login / Sign up</h4>
                <LoginOutlinedIcon
                  sx={{ fontSize: "26px" }}
                  onClick={() => navigate("/login")}
                />
              </LoginBtn>
            )}
            {user.rol === rolAdmin || user.rol === rolAdmin2 ? (
              <>
                <DashboardBtn>
                  <h4>Admin</h4>
                  <DashboardCustomizeIcon
                    sx={{ fontSize: "27px", marginBottom: "-12px" }}
                    onClick={() => navigate("/dashboard")}
                  />
                </DashboardBtn>
              </>
            ) : null}
            {user.rol === "user" && (
              <>
                <ProfileBtn>
                  <h4>Profile</h4>
                  <AccountCircleSharpIcon
                    sx={{ fontSize: "30px", marginBottom: "-13px" }}
                    onClick={() => navigate("/user-orders")}
                  />
                </ProfileBtn>
              </>
            )}
          </SideMenuWrapper>
          <LogoDiv scrolled={scroll} onClick={handleNavLinkClick}>
            <LogoLink to="/">
              <Logo
                scrolled={scroll}
                src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771276/web%20access/samples%20for%20e-commerce/Logos/2023-07-14_09h48_23-removebg-preview_yq3phy.png"
              ></Logo>
            </LogoLink>
          </LogoDiv>
          {!isCart && !isCheckout && !isDashboard && (
            <CartWidget
              scrolled={scroll}
              sx={{ padding: "10px" }}
              totalItems={totalItems}
            />
          )}
        </InsideNav>
      </Nav>
    </>
  );
};
const TransparentDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ isMenuOpen }) => (isMenuOpen ? "0" : "100%")};
  background-color: ${({ isMenuOpen }) =>
    isMenuOpen ? "none" : "rgba(0, 0, 0, 0.2)"};
  z-index: ${({ isMenuOpen }) => (isMenuOpen ? "-1" : "1")};
`;
const SideMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isMenuOpen }) => (isMenuOpen ? "-420px" : "0")};
  width: ${({ isMenuOpen }) => (isMenuOpen ? "0" : "70%")};
  transition: ${({ isMenuOpen }) =>
    isMenuOpen ? "0.3s ease-in-out" : "0.3s ease-in-out"};
  z-index: 2;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 500px) {
    width: ${({ isMenuOpen }) => (isMenuOpen ? "0" : "60%")};
  }
`;
const MenuIconBtn = styled(MenuIcon)`
  cursor: pointer;
  margin-left: 24px;
  margin-right: -5px;
  margin-top: ${(props) => (props.scrolled === "scrolled" ? "20px" : "24px")};
`;
const SideMenuHeader = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  padding: 0px 15px 15px 65px;
  margin-top: 15px;
  justify-content: flex-end;
  border-bottom: 1px solid lightgrey;
`;

const Nav = styled.nav`
  height: ${(props) => (props.scrolled === "scrolled" ? "55px" : "90px")};
  transition: height
    ${(props) => (props.scrolled === "scrolled" ? "0.16s" : "0.16s")}
    ease-in-out;
  margin: 0 auto;
  display: flex;
  position: fixed;
  z-index: ${({ isFilterOpen }) => (isFilterOpen ? "2" : "1")};
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
  justify-content: ${({ isCart, isCheckout, isDashboard }) =>
    isCart || isCheckout || isDashboard ? "center" : "space-between"};
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;
const LogoDiv = styled.div`
  width: ${(props) => (props.scrolled === "scrolled" ? "90px" : "110px")};
  transition: width
    ${(props) => (props.scrolled === "scrolled" ? "0.20s" : "0.16s")}
    ease-in-out;
`;
const LogoLink = styled(Link)`
  text-decoration: none;
`;
const Logo = styled.img`
  width: 51%;
  margin-left: ${(props) =>
    props.scrolled === "scrolled" ? "19.7px;" : "23.3px"};
  transition: margin-left 0.2s ease-in-out;
  @media (max-width: 550px) {
    margin-left: ${(props) =>
      props.scrolled === "scrolled" ? "18.8px;" : "25.3px"};
  }
`;
const LogoSideMenu = styled.div`
  width: 100%;
`;
const LogoMenu = styled.img`
  width: 50px;
  margin: 5px auto;
`;
const NavListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1.7rem;
  margin-top: 40px;
`;
const ProductsDropDown = styled.div`
  padding: 0px 20px 0px;
`;
const DropDown = styled.div`
  display: ${(props) => (props.isDrowpDownOpen ? "block" : "none")};
  top: 100%;
  left: 0;
  z-index: 1;
`;
const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 2.5%;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;
`;
const CategoryDropDown = styled.div`
  margin: 8px -21px 12px 15px;
`;
const NavList = styled.li`
  padding: 0 20px;
`;
const CategoryList = styled.li`
  padding: 0 20px;
`;
const OnClickDropDown = styled.div`
  cursor: pointer;
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
  &:hover::after {
    transform: scaleX(1);
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
  &:hover::after {
    transform: scaleX(1);
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
`;
const CategoryLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  text-transform: capitalize;
  position: relative;
  font-size: ${(props) =>
    props.scrolled === "scrolled" ? ".7rem" : "clamp(0.7rem, 1vw + 2px, 1rem)"};
  background-image: linear-gradient(to right, transparent 0%, #ecf0f8 100%);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position: left bottom;
  transition: background-size 0.1s ease-in-out, font-size 0.1s ease-in-out,
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
const DashboardBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.6rem;
`;
const ProfileBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.6rem;
`;
const LoginBtn = styled.button`
  background-color: transparent;
  position: absolute;
  bottom: 25%;
  border: none;
  font-size: 0.6rem;
  cursor: pointer;
  margin: 200px auto 0;
  width: 100%;
`;
