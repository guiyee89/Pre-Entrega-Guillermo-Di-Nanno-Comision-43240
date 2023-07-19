import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { CartContext } from "../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import styled from "styled-components/macro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";

export const ItemDetailContainer = () => {

  const { id } = useParams();//react-router-dom
  const { state } = useLocation(); //Para desestructurar la info del objeto traido con react-router-dom
  const [selectedItem, setSelectedItem] = useState(state?.selectedItem);//Inicializamos useState de esta forma para identificar si 
  //el state de navegacion proviene de Carousel o de ItemList (que no posee dicho state)
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  //Agregando items al carrito
  const onAdd = (quantity) => {
    let data = {
      ...selectedItem,
      quantity: quantity,
    };
    console.log(data)
    addToCart(data);
    setSelectedItem({ ...selectedItem, quantity: 1 });
  };

  //fetcheando los productos. Gracias a esta funcion, fetcheamos desde ItemList y Carousel
  useEffect(() => {
    const fetchSelectedItem = async () => {
      setLoading(true);
      const itemCollection = collection(db, "products");
      const refDoc = doc(itemCollection, id);
      const docSnapshot = await getDoc(refDoc);
      console.log(docSnapshot)
      if (docSnapshot.exists()) {
        setSelectedItem({
          ...docSnapshot.data(),
          id: docSnapshot.id,
        });
        
      }
      setLoading(false);
    };

    fetchSelectedItem();
  }, [id]);


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {loading ? (
        <LoaderWrapper>
          <BarLoader color="#12352e" width={250} />
        </LoaderWrapper>
      ) : (
        selectedItem && (
          <ItemDetail
            selectedItem={selectedItem}
            onAdd={onAdd}
            addToCart={addToCart}
          />
        )
      )}
    </>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 538px;
  margin-left: 35px;
`;
