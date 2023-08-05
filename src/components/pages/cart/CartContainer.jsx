import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

export const CartContainer = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const {
    cart,
    clearCart,
    removeQuantity,
    removeById,
    getTotalPrice,
    getItemPrice,
    addQuantity,
    getTotalDiscount,
    getSubTotal,
  } = useContext(CartContext);

  console.log(cart);

  const totalPrice = getTotalPrice();
  const subTotal = getSubTotal();
  const totalDiscount = getTotalDiscount();

  const navigate = useNavigate();

  const realizarCompra = async () => {
    let isValid = true;
    const missingItems = [];

    for (const product of cart) {
      const productRef = doc(db, "products", product.id);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        // Producto no existe en Firebase
        isValid = false;
        missingItems.push(product);
      }

      const productData = productSnapshot.data();
      if (product.quantity > productData.stock) {
        // Cantidad de producto en localStorage excede el stock en Firebase
        isValid = false;
        missingItems.push(product);
      }
    }

    if (isValid) {
      navigate("/Checkout");
    } else {
      // Ya no hay stock de productos
      Swal.fire({
        title:
          "<span style='font-size: 1rem; color: black'>Some items in your cart are no longer available :</span>",
        html: missingItemMessage(missingItems),
        // icon: "warning",
      });
      // clearCart();
    }
  };

  return (
    <Wrapper key="cart-wrapper">
      {/* Boton para limpiar "cart" */}
      {cart.map((product) => {
        const itemPrice = getItemPrice(product.id); //Buscar item x id en la funcion getItemPrice
        const hasDiscount = product.discountPrice; //Variable de Item con descuento
        return (
          <ItemWrapper key={product.id}>
            <ImgWrapper>
              <ItemImg src={product.img[0]} alt="" />
            </ImgWrapper>

            <ItemTitle>{product.title}</ItemTitle>

            {hasDiscount ? (
              <ItemPrice hasDiscount={hasDiscount}>
                <DiscountPrice>
                  $ {product.discountPrice * product.quantity}{" "}
                  {/* Precio con descuento */}
                </DiscountPrice>{" "}
                $ {itemPrice}
              </ItemPrice>
            ) : (
              <ItemPrice>${itemPrice}</ItemPrice>
            )}
            <DetailsWrapper>
              <Color>
                Color: <Span>{product.color}</Span>
              </Color>
              <Size>
                Size: <Span2>{product.size}</Span2>
              </Size>
            </DetailsWrapper>
            <QuantityWrapper>
              <BtnQuantity onClick={() => removeQuantity(product.id)}>
                {" "}
                -{" "}
              </BtnQuantity>
              <ItemQuantity>{product.quantity}</ItemQuantity>
              <BtnQuantity
                onClick={() => addQuantity(product.id)}
                disabled={product.stock === product.quantity}
              >
                {" "}
                +{" "}
              </BtnQuantity>
            </QuantityWrapper>

            <BtnDelete onClick={() => removeById(product.id)}>Delete</BtnDelete>
          </ItemWrapper>
        );
      })}
      <CartInfo>
        {cart.length > 0 ? (
          <>
            <ClearButton onClick={clearCart}>Clear all</ClearButton>
            <TotalPriceInfo>
              <SubTotalWrapper>
                <TotalText colSpan="1">Subtotal:</TotalText>
                <SubTotal>$ {subTotal}</SubTotal>
              </SubTotalWrapper>
              <DiscountWrapper>
                <TotalText colSpan="1">Discount:</TotalText>
                <TotalDiscount>- $ {totalDiscount}</TotalDiscount>
              </DiscountWrapper>
              <TotalWrapper>
                <TotalText colSpan="1">Total:</TotalText>
                <TotalPrice>$ {totalPrice}</TotalPrice>
              </TotalWrapper>
            </TotalPriceInfo>
            <CheckoutButton onClick={realizarCompra}>Checkout</CheckoutButton>
          </>
        ) : (
          <h1>The cart is empty</h1>
        )}
      </CartInfo>
    </Wrapper>
  );
};
//Swal Sweet Alert Message
const missingItemMessage = (missingItems) => {
  let message = "<ul style='list-style-type: none; padding: 0;'>";

  missingItems.forEach((item) => {
    message += `<li style='display: flex; align-items: center; margin-bottom: 10px;'>
                  <img src="${item.img}" alt="${item.title}" style='width: 100px; height: 100px; object-fit:contain; padding-right: 20px' />
                  <span style='font-weight: bold; color: black; padding-right: 20px'>${item.title}</span style ='color: black'> - <span> No stock </span>
                </li>`;
  });

  message += "</ul>";

  return message;
};
const Wrapper = styled.div`
  display: flex;
  width: 1100px;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  margin: 100px;
  gap: 1rem;
`;
const ItemWrapper = styled.div`
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px;
`;
const ImgWrapper = styled.div`
  height: 95%;
  width: 100px;
  display: flex;
  align-items: center;
`;
const QuantityWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const ItemQuantity = styled.h4`
  font-weight: bold;
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
  justify-content: space-evenly;
  gap: 1.5rem;
`;
const ClearButton = styled.button`
  height: max-content;
`;
const CheckoutButton = styled.button`
  height: max-content;
`;
const ItemPrice = styled.h3`
  vertical-align: middle;
`;
const DiscountPrice = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  color: #a83737;
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 10px 0px 0px;
  &::before {
    content: "";
    position: absolute;
    top: 45px;
    width: 85%;
    left: 8%;
    border-top: 0.13rem solid rgb(75, 73, 73);
  }
`;
const TotalPriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TotalWrapper = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  display: inherit;
`;
const SubTotalWrapper = styled.div`
  display: inherit;
`;
const DiscountWrapper = styled.div`
  display: inherit;
`;
const TotalText = styled.h3`
  text-align: end;
  font-weight: 500;
`;
const TotalDiscount = styled.h3`
  font-weight: 500;
  padding-left: 24px;
`;
const DetailsWrapper = styled.div`
  width: auto;
`;
const Color = styled.p`
  font-size: 0.8rem;
  
`;
const Size = styled.p`
  font-size: 0.75rem;
`;
const Span = styled.span`
  font-weight: bold;
  text-transform: capitalize;
  padding-left: 10px;
`;
const Span2 = styled.span`
  font-weight: bold;
  text-transform: capitalize;
  width: 100%;
  text-align: center;
  padding-left: 20px;
`;
const SubTotal = styled.h3`
  font-weight: 500;
  padding-left: 35px;
`;
const TotalPrice = styled.h3`
  font-weight: bold;
  font-size: 1.4rem;
  padding-left: 46px;
`;
