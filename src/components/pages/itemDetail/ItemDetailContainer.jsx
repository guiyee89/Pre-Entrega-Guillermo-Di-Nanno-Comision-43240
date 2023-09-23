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
import { Ring } from "@uiball/loaders";

export const ItemDetailContainer = () => {
  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});
  const { id } = useParams();
  const { windowWidth, setProgress } = useContext(GlobalToolsContext);
  const [loading, setLoading] = useState(true); //Loader

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
      });
      setProgress(100);
    }, 600);
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setProgress(100); // Move this here to set progress to 100 after rendering
    }, 700);
  }, [loading, setProgress]);

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
          {windowWidth > 600 ? (
            <Ring size={60} lineWeight={8} speed={2} color="black" />
          ) : (
            <Ring size={40} lineWeight={6} speed={2} color="black" />
          )}
        </LoaderWrapper>
      ) : selectedItem.id ? (
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
