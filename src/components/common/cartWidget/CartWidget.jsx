import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from 'styled-components/macro'

export const CartWidget = () => {
  return (
    <>
      <CartButton href="#">
        <ShoppingCartIcon
          sx={{color: "black" }}
          fontSize="large"
        ></ShoppingCartIcon>
        <Contador>0</Contador>
      </CartButton>
    </>
  );
};

const CartButton = styled.a`
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    margin: 16px;
    text-decoration: none;
`;
const Contador = styled.span`
    color: black;
    font-size: 1.8rem;
    font-weight: 700;
`;

