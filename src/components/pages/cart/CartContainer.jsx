import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";


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
                      <DiscountPrice>$ {product.discountPrice.toFixed(2)}</DiscountPrice>
                    )}
                    <Price hasDiscount={hasDiscount}>$ {product.price.toFixed(2)}</Price>
                  </ItemPriceWrapper>
                ) : (
                  <Price>$ {product.price.toFixed(2)}</Price>
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

              <DeleteIconBtn onClick={() => removeById(product.id)} />

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
                <SubDisText colSpan="1">Subtotal:</SubDisText>
                <SubTotal>$ {subTotal.toFixed(2)}</SubTotal>
              </SubTotalWrapper>
              <DiscountWrapper>
                <SubDisText colSpan="1">Discount:</SubDisText>
                <TotalDiscount>- $ {totalDiscount}</TotalDiscount>
              </DiscountWrapper>
              <TotalWrapper>
                <TotalText colSpan="1">Total:</TotalText>
                <TotalPrice>$ {totalPrice.toFixed(2)}</TotalPrice>
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
  width: 700px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 3px;
`;
const ItemWrapper = styled.div`
  display: flex;
  height: 115px;
  width: 100%;
  padding: 20px;
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
  margin: 0 24px 0 0px;
  border: 1px solid rgb(194, 191, 191);
  border-radius: 5%;
  width: 100px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
const ItemImg = styled.img`
  width: 90%;
  object-fit: contain;
`;
const ItemQuantity = styled.h4`
  font-weight: 600;
  font-size: 0.75rem;
`;
const ItemTitle = styled.h2`
  width: 100px;
`;
const BtnQuantity = styled.button`
  width: 32px;
  border-radius: 5%;
  border: none;
`;
const DeleteIconBtn = styled(DeleteIcon)`
  cursor: pointer;
`;
const CartInfo = styled.div`
  width: 340px;
  max-height: 320px;
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
  align-items: flex-start;
  position: relative;
  height: 100%;
  min-width: 115px;
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
const ItemPriceWrapper = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  flex-direction: column-reverse;
`;
const TotalPriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 82%;
  gap: 0.9rem;
  padding: 20px 0 15px;
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
  font-weight: bold;
`;
const SubDisText = styled.h3`
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
