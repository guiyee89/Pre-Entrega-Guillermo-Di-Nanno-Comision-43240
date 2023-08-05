import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { db } from "../../../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import styled from "styled-components/macro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";

export const ItemDetailContainer = () => {

  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});

  const { id } = useParams();

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
      });
    }, 500);
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
        <ItemDetail selectedItem={selectedItem} />
      ) : (
        <LoaderWrapper>
          {/* <BarLoader color="#12352e" width={250} /> */}
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
