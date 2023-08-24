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
      });
    }
  };

  return (
    <Wrapper key="cart-wrapper">
      {/* Boton para limpiar "cart" */}
      <CartItemsContainer>
        {cart.map((product) => {
          const itemPrice = getItemPrice(product.id); //Buscar item x id en la funcion getItemPrice
          const hasDiscount = product.discountPrice; //Variable de Item con descuento
          return (
            <ItemWrapper key={product.id}>
              <ImgWrapper>
                <ItemImg src={product.img[0]} alt="" />
              </ImgWrapper>

              <ItemTitle>{product.title}</ItemTitle>

              <PriceDeleteWrapper>
                {hasDiscount ? (
                  <ItemPriceWrapper hasDiscount={hasDiscount}>
                    {hasDiscount && (
                      <DiscountPrice>$ {product.discountPrice}</DiscountPrice>
                    )}
                    <Price hasDiscount={hasDiscount}>$ {product.price}</Price>
                  </ItemPriceWrapper>
                ) : (
                  <Price>$ {product.price}</Price>
                )}
              </PriceDeleteWrapper>
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

              <BtnDelete onClick={() => removeById(product.id)}>
                Delete
              </BtnDelete>
            </ItemWrapper>
          );
        })}
      </CartItemsContainer>
      <CartInfo>
        {cart.length > 0 ? (
          <>
            <CartTitle>order summary</CartTitle>
            {/* <ClearButton onClick={clearCart}>Clear all</ClearButton> */}
            {/* Clear Cart Button */}
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
//Swal Sweet Alert Message - NO AVAILABLE STOCK
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
  justify-content: center;
  margin-top: 50px;
  gap: 1rem;
`;
const CartItemsContainer = styled.div`
  width: 650px;
  max-height: 400px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 3px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  } 
`;
const ItemWrapper = styled.div`
  display: flex;
  height: 115px;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid lightgray;
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
  width: 90%;
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
  width: 280px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  margin-left: 20px;
  padding: 24px 0;
  background-color: #efeded;
`;
const CartTitle = styled.h2`
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
`;

// const ClearButton = styled.button`
//   height: max-content;
// `;

const CheckoutButton = styled.button`
  background-color: black;
  color: white;
  font-weight: bold;
  min-width: 140px;
  border-radius: 20px;
`;
const PriceDeleteWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
`;
const ItemPriceWrapper = styled.h4`
  display: flex;
  flex-direction: column-reverse;
`;
const DiscountPrice = styled.span`
  color: #a83737;
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  position: relative;
  display: inline-block;
  text-align: center;
`;
const Price = styled.span`
  font-weight: 600;
  font-size: ${(props) => (props.hasDiscount ? "0.8rem" : "1rem")};
  font-style: italic;
  position: relative;
  color: ${(props) => (props.hasDiscount ? "rgb(149 146 146)" : "#a83737")};
  /* Add the following styles to create the strike-through line if hasDiscount is true */
  &::after {
    content: ${(props) => (props.hasDiscount ? "''" : "none")};
    position: absolute;
    bottom: 52%;
    left: 0;
    width: 102%;
    height: 1px;
    background-color: black;
  }
`;
const TotalPriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 0.5rem;
  padding: 15px 0 15px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;
const TotalWrapper = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
`;
const SubTotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DiscountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  min-width: 150px;
`;
const Color = styled.p`
  font-size: 0.8rem;
`;
const Size = styled.p`
  font-size: 0.8rem;
`;
const Span = styled.span`
  font-weight: bold;
  padding-left: 10px;
  text-transform: capitalize;
`;
const Span2 = styled.span`
  font-weight: bold;
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  padding-left: 20px;
`;
const SubTotal = styled.h3`
  font-weight: 500;
`;
const TotalPrice = styled.h3`
  font-weight: bold;
  font-size: 1.4rem;
`;
