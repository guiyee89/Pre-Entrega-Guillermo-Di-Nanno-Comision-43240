import { useContext, useState } from "react";
import styled, { css } from "styled-components/macro";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AdminOrders } from "./manageOrders/AdminOrders";
import { AdminNewsletters } from "./manageNewsletters/AdminNewsletters";
import { ProductSearch } from "./manageProducts/ProductSearch";

export const AdminDashboard = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("clientOrders");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <DashboardNavigation>
        <LogoDiv scrolled={scroll}>
          <LogoLink to="/">
            <Logo src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771276/web%20access/samples%20for%20e-commerce/Logos/2023-07-14_09h48_23-removebg-preview_yq3phy.png"></Logo>
          </LogoLink>
        </LogoDiv>
        <DashboardListContainer>
          <DashboardList
            style={{ borderLeft: "1px solid darkgrey" }}
            onClick={() => handleOptionClick("clientOrders")}
            active={selectedOption === "clientOrders"}
          >
            <DashboardBtn>client orders</DashboardBtn>
          </DashboardList>

          <DashboardList
            onClick={() => handleOptionClick("manageProducts")}
            active={selectedOption === "manageProducts"}
          >
            <DashboardBtn>manage products</DashboardBtn>
          </DashboardList>

          <DashboardList
            onClick={() => handleOptionClick("newsletters")}
            active={selectedOption === "newsletters"}
          >
            <DashboardBtn>newsletters</DashboardBtn>
          </DashboardList>
        </DashboardListContainer>
        <LogoutBtn>
          <h4>Logout</h4>
          <ExitToAppSharpIcon
            sx={{ fontSize: "30px" }}
            onClick={() => handleLogout(navigate("/"))}
          />
        </LogoutBtn>
      </DashboardNavigation>
      {selectedOption === "clientOrders" && <AdminOrders />}
      {selectedOption === "manageProducts" && <ProductSearch />}
      {selectedOption === "newsletters" && <AdminNewsletters />}
    </>
  );
};
const DashboardNavigation = styled.nav`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 0px 3px;
  border-bottom: 1px solid rgba(133, 132, 132, 0.25);
  height: 105px;
  margin-top: -42px;
  position: fixed;
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
  margin-left: 78px;
  margin-top: 24px;
  @media screen and (max-width: 50rem) {
    width: 50%;
  }
`;
const DashboardListContainer = styled.ul`
  display: flex;
  margin: -46px 0 0 -2.1%;
  justify-content: center;
`;
const DashboardList = styled.li`
  height: 50px;
  width: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  border-right: 1px solid darkgray;
  justify-content: center;
  position: relative;
  background-image: linear-gradient(to right, transparent -250%, #ecf0f8 100%);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position: left bottom;
  transition: background-size 0.1s ease-in-out, font-size 0.1s ease-in-out,
    color 0.2s ease-in-out;

  ${({ active }) =>
    active &&
    css`
      color: #68719d;
      background-size: 100% 100%;
      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 5.2px;
        width: 95.3%;
        height: 1.1px;
        background-color: black;
        transform: scaleX(1);
        transform-origin: left center;
        transition: transform 0.21s ease-in-out;
      }
    `}
  &:hover {
    color: #68719d;
    background-size: 100% 100%;
  }
  &:active {
    color: #fafafa;
    transition: background-color 0.05s ease-in-out;
    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 5.2px;
      width: 95.3%;
      height: 1.1px;
      background-color: black;
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 0.21s ease-in-out;
    }
  }
`;

const DashboardBtn = styled.button`
  color: black;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  font-size: clamp(0.6rem, 1vw + 2px, 0.8rem);
  &:active {
    color: #fafafa;
    transition: background-color 0.1s ease-in-out;
  }
`;
const LogoutBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.65rem;
  cursor: pointer;
  position: absolute;
  margin-right: 10px;
  top: 28px;
  right: 14%;
  z-index: 2;
  @media (max-width: 950px) {
    right: 0;
  }
`;
