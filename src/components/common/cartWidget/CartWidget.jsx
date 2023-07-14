
import { Badge } from "@mui/material";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const CartWidget = ({ scrolled, totalItems }) => {
  return (
    <>
      <Link to="/cart">
        <Contador
          badgeContent={totalItems}
          showZero
          color="primary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          
          <CartWrapper scrolled={scrolled}>
            <BsFillCartFill color="black" size={"28px"} />
          </CartWrapper>
        </Contador>
      </Link>
    </>
  );
};
const Contador = styled(Badge)`
  padding-left: 8px;
  margin: 0 24px 0 0;
`;
const CartWrapper = styled.div`
  width: ${(props) => (props.scrolled === "scrolled" ? "22px" : "32px")};
  transition: width ${(props) => (props.scrolled ? "0.25s" : "0.06s")}
    ease-in-out;
`;
