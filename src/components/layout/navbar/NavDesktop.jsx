import styled from "styled-components/macro";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { menuRoutes } from "../../routes/menuRoutes";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const NavDesktop = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;
  const rolAdmin2 = import.meta.env.VITE_ROL_ADMIN2;
  //////////        ////////////        ////////////        ///////////
  //                       CartContext                      //
  const { getTotalItems } = useContext(CartContext);
  const totalItems = getTotalItems();
  const { scroll, windowWith } = useContext(GlobalToolsContext);

  //////////        ////////////        ////////////        ///////////
  /*   //                       Scroll Effect                      //
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
  }, []); */

  //////////        ////////////        ////////////        ///////////
  //                 Reset localStorage on nav links               //
  const handleNavLinkClick = () => {
    localStorage.removeItem("selectedFilters");
    localStorage.removeItem("selectedSizeOrder");
    localStorage.removeItem("selectedCategoryOrder");
    localStorage.removeItem("selectedColorOrder");
    localStorage.removeItem("currentPage");
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
      <HeaderWrapper>
        <Nav scrolled={scroll}>
          <InsideNav
            isCart={isCart}
            isCheckout={isCheckout}
            isDashboard={isDashboard}
          >
            <LogoDiv scrolled={scroll} onClick={handleNavLinkClick}>
              <LogoLink to="/">
                <Logo src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771276/web%20access/samples%20for%20e-commerce/Logos/2023-07-14_09h48_23-removebg-preview_yq3phy.png"></Logo>
              </LogoLink>
            </LogoDiv>

            {!isCart && !isCheckout && !isDashboard && (
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
                  <ProductsDropDown scrolled={scroll}>
                    <NavLink
                      to="/all-products"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      products
                    </NavLink>
                    <ArrowDropDownIcon sx={{ marginTop: "-5px" }} />
                    <DropDown scrolled={scroll}>
                      <CategoryDropDown>
                        <CategoryContainer>
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
                        </CategoryContainer>
                      </CategoryDropDown>
                      <ImagesDropDown>
                        <Img src="https://res.cloudinary.com/derdim3m6/image/upload/v1698184947/web%20access/samples%20for%20e-commerce/Landing%20Page/2023-10-24_18h59_21-min_eyd7xl.png" />
                        <Img src="https://res.cloudinary.com/derdim3m6/image/upload/v1698183856/web%20access/samples%20for%20e-commerce/Landing%20Page/wjxscadfdn8jycft7uag.png" />
                        <Img src="https://res.cloudinary.com/derdim3m6/image/upload/v1697638546/web%20access/samples%20for%20e-commerce/Landing%20Page/2023-10-18_11h13_31_fpyc0v.png" />
                        {/* <Img src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771373/web%20access/samples%20for%20e-commerce/Hero/2023-06-15_18h29_30_wnx8lf600_nkjhmm.png" />
                        <Img src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771371/web%20access/samples%20for%20e-commerce/Hero/2023-06-15_18h30_07_ojrorw600_old1wz.png" /> */}
                      </ImagesDropDown>
                    </DropDown>
                  </ProductsDropDown>
                  <NavList>
                    <NavLink
                      to="/all-products"
                      scrolled={scroll}
                      onClick={handleNavLinkClick}
                    >
                      contact us
                    </NavLink>
                  </NavList>
                </NavListWrapper>

                <DashCartContainer>
                  <CartWidget
                    scrolled={scroll}
                    sx={{ padding: "10px" }}
                    totalItems={totalItems}
                  />
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
                      <DashboardBtn scrolled={scroll}>
                        <h4>Admin</h4>
                        <DashboardCustomizeIcon
                          sx={{ fontSize: "27px" }}
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
                </DashCartContainer>
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
  justify-content: ${({ isCart, isCheckout, isDashboard }) =>
    isCart || isCheckout || isDashboard ? "center" : "space-between"};
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
  padding: 0px 50px;
  height: 20px;
`;
const CategoryList = styled.li`
  width: 30%;
  height: 20px;
  text-align: center;
`;
const ProductsDropDown = styled.div`
  margin: 0 0px -25px 12px;
  padding: 0 20px 25px;
`;
const DropDown = styled.div`
  top: -109px;
  opacity: 0;
  position: absolute;
  background-color: white;
  right: 0px;
  width: 100%;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => (props.scrolled === "scrolled" ? "-26px" : "0px")};
  ${ProductsDropDown}:hover & {
    opacity: 1;
    transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
    top: 91px;
    height: 150px;
  }
`;
const CategoryContainer = styled.div`
  width: 62%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;
const CategoryDropDown = styled.div`
  width: 50%;
  display: flex;
  height: 70%;
  justify-content: flex-end;
`;
const ImagesDropDown = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  border-left: 1px solid lightgray;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-evenly;
`;
const Img = styled.img`
  height: 67%;
  width: 15%;
  border-radius: 50%;
  object-fit: cover;
  /* object-fit: contain;
  height: 67%;
  width: 100%; */
`;
const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 600;
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
const CategoryLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  position: relative;
  font-size: ${(props) =>
    props.scrolled === "scrolled"
      ? ".63rem"
      : "clamp(0.60rem, 2vw + 1px, 0.65rem);"};
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
`;
const DashCartContainer = styled.div`
  display: flex;
  align-items: center;
`;
const DashboardBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.6rem;
  margin-bottom: ${(props) => (props.scrolled === "scrolled" ? "4px" : "-6px")};
`;
const ProfileBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.6rem;
`;
const LoginBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.6rem;
  cursor: pointer;
  margin-bottom: -6px;
`;
