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
  const [searchUserId, setSearchUserId] = useState(""); // State to store the userId for searching
  const [isChanged, setIsChanged] = useState(false)


  const fetchItemsByUserId = async () => {
    if (searchUserId.trim() !== "") {
      const itemsCollection = collection(db, "products");
      const q = query(
        itemsCollection,
        where("userId", "==", parseFloat(searchUserId))
      );
      console.log("fetcheando...")
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(items);
    } else {
      setProducts([]);
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

  // const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  // const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items
  // const [selectedItem, setSelectedItem] = useState(null);// State to manage new or edit product

  // console.log(filteredItems);

  // // Function to fetch items based in SearchQuery
  // const fetchItemsByUserId = async (userId) => {
  //   const itemsCollection = collection(db, "products");
  //   const q = query(itemsCollection, where("userId", "==", userId));
  //   const snapshot = await getDocs(q);
  //   const items = snapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   console.log("fetcheando...??");
  //   setFilteredItems(items);
  // };

  // // Search for items on Click
  // const handleSearch = () => {
  //   if (searchQuery.trim() !== "") {
  //     fetchItemsByUserId(parseFloat(searchQuery));
  //   } else {
  //     setFilteredItems([]);
  //   }
  // };

  // // Delete items from App
  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(db, "products", id));
  //   if (searchQuery.trim() !== "") {
  //     // After deletion, you can refetch the items to update the UI
  //     fetchItemsByUserId(parseFloat(searchQuery));
  //   }
  // };

  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = (product) => {
  //   if (product) {
  //     setSelectedItem(product);
  //   }else {
  //     setSelectedItem([])
  //   }
  //   setOpen(true);
  // };

  // const handleEdit = async (id) => {
  //   console.log(id);
  // };

  return (
    <>
      <DashboardWrapper>
        <TextFieldInput
          label="Buscar por ID"
          variant="outlined"
          name="id"
          value={searchUserId}
          onChange={(e) => setSearchUserId(e.target.value)}
          sx={{ marginTop: "12px", marginLeft:"40px" }}
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
          isChanged
          setIsChanged={handleIsChanged}
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
