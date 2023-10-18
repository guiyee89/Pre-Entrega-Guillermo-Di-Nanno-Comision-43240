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
import { ProductList } from "./ProductList";
import { Button, TextField } from "@mui/material";
import styled from "styled-components/macro";



export const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items



  console.log(filteredItems);

  /* FUNCTION TO FETCH ITEMS BASED IN SEARCHQUERY */
  const fetchItemsByUserId = async (userId) => {
    const itemsCollection = collection(db, "products");
    const q = query(itemsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("fetcheando...??");
    setFilteredItems(items);

  };

  /* SEARCH FOR ITEMS ON CLICK */
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchItemsByUserId(parseFloat(searchQuery));
    } else {
      setFilteredItems([]); // If the search query is empty, clear the filtered items
    }
  };

  /* DELETE ITEMS FROM APP */
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id)); // Delete the item from Firestore
    if (searchQuery.trim() !== "") {
      // After deletion, you can refetch the items to update the UI
      fetchItemsByUserId(parseFloat(searchQuery));
    }
  };

  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = async (id) => {
    console.log(id);
  };

  return (
    <>
      <DashboardWrapper>
        <Button
          variant="contained"
          sx={{ marginRight: "40px", marginTop: "17px" }}
          onClick={()=>setOpen(true)}
        >
          Agregar Producto
        </Button>
        <TextFieldInput
          label="Buscar por ID"
          variant="outlined"
          name="id"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginTop: "12px" }}
        />
        <Button
          variant="contained"
          sx={{ marginLeft: "10px", marginTop: "18px" }}
          onClick={handleSearch}
        >
          Buscar
        </Button>
        <ProductList
          filteredItems={filteredItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          open={open}
          handleClose={handleClose}
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
