import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const CartContainer = () => {
  const { cart, clearCart, removeQuantity, removeById, getTotalPrice, getItemPrice } =
    useContext(CartContext);

  const totalPrice = getTotalPrice();
  // const ItemPrice = getItemPrice()
  const navigate = useNavigate();

  const realizarCompra = () => {
    navigate("/");
  };

  return (
    <Wrapper key="cart-wrapper">
      {/* Boton para limpiar "cart" */}
      {cart.map((product) => {
        return (
          <ItemWrapper key={product.id}>
            <ImgWrapper>
              <ItemImg src={product.img} alt="" />
            </ImgWrapper>
            <ItemTitle>{product.name}</ItemTitle>
            <h3>{}</h3>
            <h4>{product.quantity}</h4>
            <BtnQuantity onClick={() => removeQuantity(product.id)}>
              -
            </BtnQuantity>
            <BtnDelete onClick={() => removeById(product.id)}>
              Eliminar
            </BtnDelete>
          </ItemWrapper>
        );
      })}
      <CartInfo>
        <button onClick={realizarCompra}>Comprar</button>
        <h4>{totalPrice}</h4>
        {cart.length > 0 && (
          <button onClick={clearCart}>Limpiar Carrito</button>
        )}
      </CartInfo>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  margin: 100px;
  gap: 1rem;
`;
const ItemWrapper = styled.div`
  display: flex;
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px;
`;
const ImgWrapper = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 70%;
  object-fit: contain;
`;
const ItemTitle = styled.h2`
  width: 100px;
`;
const BtnQuantity = styled.button`
  width: 30px;
`;
const BtnDelete = styled.button`
  width: fit-content;
`;
const CartInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
`;
