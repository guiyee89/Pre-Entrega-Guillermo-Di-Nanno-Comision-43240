import { useState } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { ProductList } from "./ProductList";

export const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredItems, setFilteredItems] = useState([]); // State to store filtered items

  console.log(filteredItems)


  /* FUNCTION TO FETCH ITEMS BASED IN SEARCHQUERY */
  const fetchItemsByUserId = async (userId) => {
    const itemsCollection = collection(db, "products");
    const q = query(itemsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("fetcheando...??")
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
    await deleteDoc(doc(db, "products", id));   // Delete the item from Firestore
    if (searchQuery.trim() !== "") {     // After deletion, you can refetch the items to update the UI
      fetchItemsByUserId(parseFloat(searchQuery));
    }
  };

  
  const handleEdit = async (id) => {

  }

  return (
    <>
      <div>
        <h1>Soy el admin estoy en el dashboard</h1>
        <input
          type="number"
          placeholder="Search by ID number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ProductList filteredItems={filteredItems} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
    </>
  );
};
