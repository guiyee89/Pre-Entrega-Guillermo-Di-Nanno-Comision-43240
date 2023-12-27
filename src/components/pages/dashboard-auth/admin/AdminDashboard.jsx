import { useContext, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import styled from "styled-components/macro";
import { ProductList } from "./manageProducts/ProductList";
import { useEffect } from "react";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState(""); // State to store the userId for searching
  const [foundProduct, setFoundProduct] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

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
      <LogoutBtn>
        <h4>Logout</h4>
        <ExitToAppSharpIcon
          sx={{ fontSize: "30px" }}
          onClick={() => handleLogout(navigate("/"))}
        />
      </LogoutBtn>
      <ProductList
        products={products}
        setIsChanged={handleIsChanged}
        foundProduct={foundProduct}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        fetchItemsByUserId={fetchItemsByUserId}
      />
    </>
  );
};

const LogoutBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 0.65rem;
  cursor: pointer;
  position: absolute;
  margin-right: 10px;
  top: 95px;
  right: 14%;
  @media (max-width:950px){
    right: 0;
  }
`;
