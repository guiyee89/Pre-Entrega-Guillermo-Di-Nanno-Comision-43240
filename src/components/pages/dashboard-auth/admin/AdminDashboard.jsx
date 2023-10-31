import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { Button, TextField } from "@mui/material";
import styled from "styled-components/macro";
import { ProductList } from "./manageProducts/ProductList";
import { useEffect } from "react";

export const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState(""); // State to store the userId for searching
  const [foundProduct, setFoundProduct] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const fetchItemsByUserId = async () => {
    if (searchProduct.trim() !== "") {
      const itemsCollection = collection(db, "products");
      const q = query(
        itemsCollection,
        where("userId", "==", parseFloat(searchProduct))
      );
      console.log("fetcheando...");
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(items);
      setFoundProduct(true);
    } else {
      setProducts([]);
      setFoundProduct(false);
    }
  };

  // Use an effect to fetch products by searching or editing
  useEffect(() => {
    fetchItemsByUserId();
  }, [isChanged]);

  const handleIsChanged = () => {
    setIsChanged(!isChanged); // Toggle isChanged to trigger useEffect
  };

  console.log(products);

  return (
    <>
      <DashboardWrapper>
        <TextFieldInput
          label="Buscar por ID"
          variant="outlined"
          name="id"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          sx={{ marginTop: "12px", marginLeft: "40px" }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: "10px", marginTop: "18px" }}
          onClick={fetchItemsByUserId}
        >
          Buscar
        </Button>
        <ProductList
          products={products}
          setIsChanged={handleIsChanged}
          foundProduct={foundProduct}
        />
      </DashboardWrapper>
    </>
  );
};
const DashboardWrapper = styled.div`
  width: 100%;
  margin-top: 150px;
`;
const TextFieldInput = styled(TextField)`
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 11.5px 4px;
  }
`;
