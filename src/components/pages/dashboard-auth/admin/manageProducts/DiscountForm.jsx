import { Button, TextField } from "@mui/material";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import { db } from "../../../../../firebaseConfig";

export const DiscountForm = ({ setIsChanged, products }) => {
  console.log(products);

  const [getDiscount, setGetDiscount] = useState();

  useEffect(() => {
    // Find the product with the given userId
    const productWithUserId = products.find(
      (product) => product.userId !== undefined
    );

    // If found, set the discount value
    if (productWithUserId) {
      setGetDiscount(productWithUserId.discount);
    } else {
      setGetDiscount(""); // Reset the discount value if not found
    }
  }, [products]);

  const handleChange = (e) => {
    setGetDiscount(e.target.value);
  };

  ////////////          SUBMIT          //////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const itemsCollection = collection(db, "products");
  
    // Check if getDiscount is not an empty string
    if (products && getDiscount !== "") {
      // Parse the discount value to a float
      const newDiscount = parseFloat(getDiscount);
  
      // Iterate through each product in the state and update the discount
      const updatedProducts = products.map((product) => {
        const price = parseFloat(product.unit_price);
        const discount = newDiscount; // Use the latest discount value
        const discountAmount = (price * discount) / 100;
        let totalPrice = price;
        totalPrice -= discountAmount;
  
        return {
          ...product,
          discount: discount || null,
          discountPrice: totalPrice || null,
        };
      });
  
      // Update each document in the database
      for (const updatedProduct of updatedProducts) {
        await updateDoc(doc(itemsCollection, updatedProduct.id), updatedProduct);
      }
      setIsChanged();

    } else {
      // Handle the case where the input is empty
      const updatedProducts = products.map((product) => ({
        ...product,
        discount: null,
        discountPrice: null,
      }));
  
      // Update each document in the database
      for (const updatedProduct of updatedProducts) {
        await updateDoc(doc(itemsCollection, updatedProduct.id), updatedProduct);
      }
      setIsChanged();

    }
  };
  
  return (
    <>
      <Div>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <div style={{ width: "80%" }}>
              <h2>Descuento en %</h2>
              <Input
                label={getDiscount ? "" : "Ejemplo: 10%"}
                variant="outlined"
                name="discount"
                value={getDiscount || ""}
                onChange={handleChange}
                // helperText={errors.discount}
                // error={errors.discount ? true : false}
                sx={{ marginBottom: "18px" }}
              />
            </div>
            <SubmitBtn
              type="submit"
              variant="contained"
              sx={{ margin: "20px auto" }}
            >
              Confirmar
            </SubmitBtn>
          </Form>
        </FormWrapper>
      </Div>
    </>
  );
};
const FormWrapper = styled.div`
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
  padding: 20px 12px;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const Div = styled.div`
  width: 100%;
`;
const Input = styled(TextField)`
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 12.5px 5px;
  }
  width: 150px;
`;
const SubmitBtn = styled(Button)`
  width: 10%;
`;
