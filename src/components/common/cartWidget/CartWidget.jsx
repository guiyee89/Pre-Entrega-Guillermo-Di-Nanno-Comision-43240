// import { IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
// import { CartContext } from "../../context/CartContext";
// import { useContext } from "react";

export const CartWidget = ( {isScrolled, totalItems} ) => {
  
  // function notificationsLabel(count) {
  //   if (count === 0) {
  //     return "no notifications";
  //   }
  //   if (count > 99) {
  //     return "more than 99 notifications";
  //   }
  //   return `${count} notifications`;
  // }
  // const { getTotalItems } = useContext(CartContext)

  // const totalItems = getTotalItems()
  
  return (
    <>
      {/* <IconButton aria-label={notificationsLabel(100)}> */}
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
            {/* Le pasamos props en base a lo que especifique la libreria */}
            <CartWrapper isScrolled={isScrolled}>
              <BsFillCartFill color="black" size={"28px"} />
            </CartWrapper>
          </Contador>
        </Link>
      {/* </IconButton> */}
    </>
  );
};
const Contador = styled(Badge)`
  padding-left: 8px;
  margin: 0 8px 0 0;
`;
const CartWrapper = styled.div`
  width: ${(props) => (props.isScrolled ? "22px" : "32px")};
  transition: width ${(props) => (props.isScrolled ? "0.25s" : "0.06s")}
    ease-in-out;
`;
