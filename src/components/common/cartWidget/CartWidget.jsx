import { Badge } from "@mui/material";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { SideCartContext } from "../../context/SideCartContext";
import { useContext } from "react";

export const CartWidget = ({ scrolled, totalItems }) => {

  const { togglecart } = useContext(SideCartContext);

  return (
    <>
      <CartWidgetWrapper onClick={togglecart}>
        {/*  <Link to="/cart"> */}
        <Contador
          badgeContent={totalItems}
          aria-label={totalItems}
          showZero
          color="warning"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <CartWrapper scrolled={scrolled}>
            <BsFillCartFill color="black" size={"28px"} />
          </CartWrapper>
        </Contador>
        {/* </Link> */}
      </CartWidgetWrapper>
    </>
  );
};
const CartWidgetWrapper = styled.div`
  cursor: pointer;
`
const Contador = styled(Badge)`
  padding-left: 8px;
  margin: 0 24px 0 0;
  .css-16rm5dn-MuiBadge-badge {
    font-weight: 600;
    font-size: 0.85rem;
    height: 23px;
    border-radius: 50%;
    min-width: 23px;
  }
`;
const CartWrapper = styled.div`
  width: ${(props) => (props.scrolled === "scrolled" ? "22px" : "32px")};
  transition: width ${(props) => (props.scrolled ? "0.25s" : "0.06s")}
    ease-in-out;
`;
