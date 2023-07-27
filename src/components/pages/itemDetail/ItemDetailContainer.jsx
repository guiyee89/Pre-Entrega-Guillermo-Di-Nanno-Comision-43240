import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { CartContext } from "../../context/CartContext";
import { db } from "../../../firebaseConfig";
import {collection,getDoc,doc,query,where,getDocs} from "firebase/firestore";
import styled from "styled-components/macro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";

export const ItemDetailContainer = () => {
  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});
  const [relatedItems, setRelatedItems] = useState([]);

  //PROVEEMOS EL "CONTEXTO"
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();

  //AGREGAMOS PRODUCTOS AL CARRITO
  const onAdd = (quantity) => {
    let data = {
      ...selectedItem,
      quantity: quantity,
    };
    //Agregamos la "data" de los productos con la funcion de contexto
    addToCart(data);
    setSelectedItem({ ...selectedItem, quantity: 1 }); //Reset count inicial a 1
  };

  //ENCONTRAMOS PRODUCTO POR "ID" Y BUSCAMOS MAS ITEMS QUE COINCIDAN EN "USERID" PARA RENDERIZAR
  useEffect(() => {
    const itemCollection = collection(db, "products");
    const refDoc = doc(itemCollection, id);

    setTimeout(() => {
      getDoc(refDoc).then((response) => {
        setSelectedItem({
          ...response.data(),
          id: response.id,
        });

        const userId = response.data().userId;
        // Fetch related items by userId
        const relatedItemsQuery = query(
          itemCollection,
          where("userId", "==", userId)
        );
        getDocs(relatedItemsQuery).then((snapshot) => {
          const relatedItems = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setRelatedItems(relatedItems);
        });
      });
    }, 800);
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
      {selectedItem.id ? (
        <ItemDetail
          selectedItem={selectedItem}
          relatedItems={relatedItems}
          onAdd={onAdd}
          // onFilterChange={handleFilter}
        />
      ) : (
        <LoaderWrapper>
          <BarLoader color="#12352e" width={250} />
        </LoaderWrapper>
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
