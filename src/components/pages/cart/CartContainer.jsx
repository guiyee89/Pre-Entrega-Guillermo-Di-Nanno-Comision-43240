import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const CartContainer = () => {

  const { cart, clearCart, removeQuantity, removeById, getTotalPrice, getItemPrice, addQuantity} = useContext(CartContext);

  const totalPrice = getTotalPrice();

  const navigate = useNavigate();

  const realizarCompra = () => {
    navigate("/Checkout");
  };

  return (
    <Wrapper key="cart-wrapper">

      {/* Boton para limpiar "cart" */}
      {cart.map((product) => {
        //Buscar item x id en la funcion getItemPrice
        const itemPrice = getItemPrice(product.id);

        return (
          <ItemWrapper key={product.id}>

            <ImgWrapper>
              <ItemImg src={product.img} alt="" />
            </ImgWrapper>

            <ItemTitle>{product.name}</ItemTitle>

            <ItemPrice>${itemPrice}</ItemPrice>

            <QuantityWrapper>
              <BtnQuantity onClick={() => removeQuantity(product.id)}> - </BtnQuantity>
              <ItemQuantity>{product.quantity}</ItemQuantity>
              <BtnQuantity onClick={() => addQuantity(product.id)} disabled={product.stock === product.quantity}> + </BtnQuantity>
            </QuantityWrapper>

            <BtnDelete onClick={() => removeById(product.id)}>
              Eliminar
            </BtnDelete>

          </ItemWrapper>
        );
      })}
      <CartInfo>
        <button onClick={realizarCompra}>Checkout</button>
        <h4>${totalPrice}</h4>
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
const QuantityWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 70%;
  object-fit: contain;
`;
const ItemQuantity = styled.h4`
`
const ItemPrice = styled.h3`
`
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
