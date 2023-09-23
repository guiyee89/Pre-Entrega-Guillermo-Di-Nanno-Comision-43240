import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemDetailDesktop } from "./itemDetailDesktop/ItemDetailDesktop";
import { ItemDetailMobile } from "./itemDetailMobile/ItemDetailMobile";
import { db } from "../../../firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore";
import styled from "styled-components/macro";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import LoadingBar from "react-top-loading-bar";

export const ItemDetailContainer = () => {
  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});
  const { id } = useParams();
  const { windowWidth, setProgress } = useContext(GlobalToolsContext);

  //ENCONTRAMOS PRODUCTO POR "ID" Y BUSCAMOS MAS ITEMS QUE COINCIDAN EN "USERID" PARA RENDERIZAR
  useEffect(() => {
    setProgress(45);
    const itemCollection = collection(db, "products");
    const refDoc = doc(itemCollection, id);

    setTimeout(() => {
      getDoc(refDoc).then((response) => {
        setSelectedItem({
          ...response.data(),
          id: response.id,
        });
        if (response) {
          setProgress(100);
        }
      });
      
    }, 600);
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
        <>
          {windowWidth > 950 ? (
            <ItemDetailDesktop selectedItem={selectedItem} />
          ) : (
            <ItemDetailMobile selectedItem={selectedItem} />
          )}
        </>
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
