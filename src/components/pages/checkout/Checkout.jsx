import { TextField } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";

export const Checkout = ({ handleSubmit, handleChange, errors }) => {
  const { cart, getTotalPrice, getItemPrice, getTotalDiscount, getSubTotal } =
    useContext(CartContext);

  const total = getTotalPrice();
  const subTotal = getSubTotal();
  const totalDiscount = getTotalDiscount();

  return (
    <>
      <Wrapper>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Input
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleChange}
              helperText={errors.name}
              error={errors.name ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Confirm Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <Input
              label="Phone"
              variant="outlined"
              name="phone"
              onChange={handleChange}
              helperText={errors.phone}
              error={errors.phone ? true : false}
              sx={{ marginTop: "24px" }}
            />
            <SubmitBtn type="submit" onClick={handleSubmit}>
              Confirm Purchase
            </SubmitBtn>
          </Form>
        </FormWrapper>

        <ProductsWrapper key="cart-wrapper">
          <ProductTable>
            <thead style={{ borderBottom: "1px solid lightgrey" }}>
              <tr>
                <th style={{ textAlign: "center", paddingLeft: "45px" }}>
                  Product
                </th>
                <th style={{ paddingBottom: "8px" }}>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => {
                const itemPrice = getItemPrice(product.id); //Buscar item x id en la funcion getItemPrice
                const hasDiscount = product.discountPrice; //Variable de Item con descuento
                // const totalDiscount = itemPrice - hasDiscount * product.quantity
                return (
                  <tr key={product.id}>
                    <ItemWrapper>
                      <ImgWrapper>
                        <ItemImg src={product.img} alt="" />
                      </ImgWrapper>
                      <ItemTitle>{product.title}</ItemTitle>
                    </ItemWrapper>
                    {hasDiscount ? (
                      <ItemPriceWrapper hasDiscount={hasDiscount}>
                        {hasDiscount && (
                          <DiscountPrice>
                            $ {product.discountPrice.toFixed(2)}
                          </DiscountPrice>
                        )}
                        <Price hasDiscount={hasDiscount}>
                          $ {product.price.toFixed(2)}
                        </Price>
                      </ItemPriceWrapper>
                    ) : (
                      <Price>$ {product.price.toFixed(2)}</Price>
                    )}
                    <ItemQuantity>{product.quantity}</ItemQuantity>
                  </tr>
                );
              })}
            </tbody>
          </ProductTable>
        </ProductsWrapper>

        <TotalPriceInfo>
          <SubTotalWrapper>
            <TotalText colSpan="1">Subtotal:</TotalText>
            <SubTotal>$ {subTotal.toFixed(2)}</SubTotal>
          </SubTotalWrapper>
          <DiscountWrapper>
            <TotalText colSpan="1">Discount:</TotalText>
            <TotalDiscount>- $ {totalDiscount.toFixed(2)}</TotalDiscount>
          </DiscountWrapper>
          <TotalWrapper>
            <TotalText colSpan="1">Total:</TotalText>
            <TotalPrice>$ {total.toFixed(2)}</TotalPrice>
          </TotalWrapper>
        </TotalPriceInfo>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  display: flex;
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
`;
const ItemQuantity = styled.td`
  vertical-align: middle;
`;
const FormWrapper = styled.div`
  position: relative;
  width: 600px;
  border-right: 2px solid lightgray;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 100px;
`;
const Input = styled(TextField)`
  width: 350px;
  padding-top: 12px;
`;
const SubmitBtn = styled.button`
  width: 190px;
  height: 42px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: black;
  color: white;
  margin-top: 24px;
  position: absolute;
  bottom: -90px;
  left: 85%;
`;
const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 0 115px 0 20px;
`;
const ProductTable = styled.table`
  text-align: center;
  margin-bottom: 40px;
`;
const ItemWrapper = styled.td`
  display: flex;
  align-items: center;
  padding-top: 8px;
  height: 70px;
`;
const ItemTitle = styled.h2`
  margin: 0 auto;
`;
const ImgWrapper = styled.div`
  height: 100%;
`;
const ItemImg = styled.img`
  width: 50px;
  height: 100%;
  object-fit: contain;
`;
const ItemPriceWrapper = styled.td`
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
  position: absolute;
  width: 24%;
  display: flex;
  flex-direction: column;
  bottom: -110px;
  right: 14%;
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
const SubTotal = styled.h3`
  font-weight: 500;
  padding-left: 35px;
`;
const TotalPrice = styled.h3`
  font-weight: bold;
  font-size: 1.4rem;
  padding-left: 46px;
`;
