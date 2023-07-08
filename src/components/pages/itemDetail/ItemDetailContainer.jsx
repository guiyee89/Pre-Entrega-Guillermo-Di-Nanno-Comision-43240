import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { CartContext } from "../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
// import { Toaster } from "../../common/loaders/Toaster";
// import { Loader } from "../../common/loaders/Loader";
import styled from "styled-components/macro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";

export const ItemDetailContainer = () => {
  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});

  //PROVEEMOS EL "CONTEXTO"
  const { addToCart } = useContext(CartContext);

  const { id } = useParams();

  //Obtener cantidades por ID para pasar la data
  // const quantityId = getTotalQuantityById(id);

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

  //ENCONTRAMOS PRODUCTOS POR "ID" Y RESOLVEMOS PROMISE PARA RENDERIZAR
  useEffect(() => {
    let itemCollection = collection(db, "products");
    let refDoc = doc(itemCollection, id);

    setTimeout(() => {
      getDoc(refDoc).then((response) => {
        setSelectedItem({
          ...response.data(),
          id: response.id,
        });
      });
    }, 950);
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
          onAdd={onAdd}
          addToCart={addToCart}
        />
      ) : (
        <LoaderWrapper>
          <BarLoader color="#12352e"  width={250}/>
        </LoaderWrapper>
      )}
    </>
  );
};
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
