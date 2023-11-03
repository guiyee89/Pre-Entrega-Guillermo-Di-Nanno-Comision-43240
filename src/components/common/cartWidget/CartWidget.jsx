import { Badge } from "@mui/material";
// import { BsFillCartFill } from "react-icons/bs";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import styled from "styled-components/macro";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import { useContext } from "react";

export const CartWidget = ({ scrolled, totalItems }) => {
  const { toggleSideCart } = useContext(GlobalToolsContext);

  return (
    <>
      <CartWidgetWrapper onClick={toggleSideCart}>
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
            <ShoppingBagOutlinedIcon fontSize="medium" />
            {/* <BsFillCartFill color="black" size={"28px"} /> */}
          </CartWrapper>
        </Contador>
      </CartWidgetWrapper>
    </>
  );
};
const CartWidgetWrapper = styled.div`
  cursor: pointer;
  margin-bottom: -12px;
`;
const Contador = styled(Badge)`
  padding-left: 8px;
  margin: 0 24px 0 0;
  z-index: 0;
  .css-16rm5dn-MuiBadge-badge {
    font-size: 0.75rem;
    height: 21.2px;
    bottom: 4px;
    border-radius: 50%;
    min-width: 22px;
    @media screen and (max-width: 50rem) {
      border-radius: 50%;
    }
  }
`;
const CartWrapper = styled.div`
  width: ${(props) => (props.scrolled === "scrolled" ? "22px" : "32px")};
  transition: width ${(props) => (props.scrolled ? "0.25s" : "0.06s")}
    ease-in-out;
  margin-top: ${(props) => (props.scrolled === "scrolled" ? "-8px" : "3px")};
  @media screen and (max-width: 50rem) {
    width: 22px;
  }
`;
