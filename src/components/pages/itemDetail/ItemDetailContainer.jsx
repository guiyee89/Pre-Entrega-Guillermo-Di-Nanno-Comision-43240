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
  // Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});
  const { id } = useParams();
  const {
    windowWidth,
    setProgress,
    loading,
    setLoading,
    setVisible,
    progress,
    progressComplete, 
    setProgressComplete
  } = useContext(GlobalToolsContext);
  // const [progressComplete, setProgressComplete] = useState(false);

  // ENCONTRAMOS PRODUCTO POR "ID" Y BUSCAMOS MAS ITEMS QUE COINCIDAN EN "USERID" PARA RENDERIZAR
  useEffect(() => {
    setLoading(true);
    setVisible(true);
    const itemCollection = collection(db, "products");
    const refDoc = doc(itemCollection, id);
    console.log("fetching from ItemDetailContainer");
    getDoc(refDoc)
      .then((response) => {
        setSelectedItem({
          ...response.data(),
          id: response.id,
        });
        setTimeout(() => {
          setLoading(false);
          setProgressComplete(true);
          // if (!progressComplete === true && loading === false) {
          //   setProgress(100);
          // }
          if (loading === false && progress === 100) {
            setVisible(false);
          }
        }, 250); // Set loading to false, progress to 100, and progressComplete to true after a delay
      })
      .catch((err) => console.log(err));
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
          {windowWidth > 600 ? (
            <Ring size={60} lineWeight={8} speed={2} color="black" />
          ) : (
            <Ring size={40} lineWeight={6} speed={2} color="black" />
          )}
        </LoaderWrapper>
      ) : (
        progressComplete && (
          <>
            {windowWidth > 950 ? (
              <ItemDetailDesktop selectedItem={selectedItem} />
            ) : (
              <ItemDetailMobile selectedItem={selectedItem} />
            )}
          </>
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
