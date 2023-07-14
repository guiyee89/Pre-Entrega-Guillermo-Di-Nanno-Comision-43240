import { TextField } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components/macro";
import { CartContext } from "../../context/CartContext";


export const Checkout = ({ handleSubmit, handleChange, errors }) => {

  const { cart, getTotalPrice, getItemPrice } = useContext(CartContext);

  let total = getTotalPrice();

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
            <SubmitBtn type="submit" onClick={handleSubmit}>Confirm Purchase</SubmitBtn>
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
                const itemPrice = getItemPrice(product.id);
                return (
                  <tr key={product.id}>
                    <ItemWrapper>
                      <ImgWrapper>
                        <ItemImg src={product.img} alt="" />
                      </ImgWrapper>
                      <ItemTitle>{product.title}</ItemTitle>
                    </ItemWrapper>
                    <ItemPrice>${itemPrice}</ItemPrice>
                    <ItemQuantity>{product.quantity}</ItemQuantity>
                  </tr>
                );
              })}
              <TotalInfo>
                <TotalText colSpan="1">Total:</TotalText>
                <TotalPrice>${total}</TotalPrice>
              </TotalInfo>
            </tbody>
          </ProductTable>
        </ProductsWrapper>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  display: flex;
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  width: 100%;
`;
const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 0 115px 0 20px;
`;
const ProductTable = styled.table`
  text-align: center;
`;
const ItemWrapper = styled.td`
  display: flex;
  align-items: center;
  padding-top: 8px;
`;
const ItemTitle = styled.h2`
  margin: 0 auto;
`;
const ImgWrapper = styled.div``;
const ItemImg = styled.img`
  width: 50px;
`;
const ItemPrice = styled.td`
  vertical-align: middle;
`;
const TotalInfo = styled.tr`
  position: absolute;
  bottom: 0;
  right: 23%;
`;
const TotalText = styled.td`
  text-align: end;
`;
const TotalPrice = styled.td`
  font-weight: bold;
  padding-left: 35px;
`;
const ItemQuantity = styled.td`
  vertical-align: middle;
`;
const FormWrapper = styled.div`
  position: relative;
  width: 50%;
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
