import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export const CartContainer = () => {
  const { cart, clearCart, removeQuantity, removeById, getTotalPrice } =
    useContext(CartContext);

  const totalPrice = getTotalPrice();
  
  const navigate = useNavigate();

  const realizarCompra = () => {
    navigate("/");
  };

  return (
    <Wrapper key="cart-wrapper">
      {/* Boton para limpiar "cart" */}
      {cart.length > 0 && <button onClick={clearCart}>Limpiar Carrito</button>}
      {cart.map((product) => {
        return (
          <div key={product.id}>
            <img src={product.img} alt="" />
            <h2>{product.name}</h2>
            <h3>{product.price}</h3>
            <h4>{product.quantity}</h4>
            <BtnQuantity onClick={() => removeQuantity(product.id)}>
              -
            </BtnQuantity>
            <BtnDelete onClick={() => removeById(product.id)}>
              Eliminar
            </BtnDelete>
          </div>
        );
      })}
      <button onClick={realizarCompra}>Comprar</button>
      <h4>{totalPrice}</h4>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 100px;
  gap: 1rem;
`;
const BtnQuantity = styled.button`
  width: 30px;
`;
const BtnDelete = styled.button`
  width: 60px;
`;
