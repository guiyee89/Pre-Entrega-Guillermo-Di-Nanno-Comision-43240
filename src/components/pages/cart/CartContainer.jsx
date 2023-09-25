import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import { CartDesktop } from "./CartDesktop";
import { CartMobile } from "./CartMobile";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components/macro";
import { Ring } from "@uiball/loaders";

//Swal Sweet Alert Message - NO AVAILABLE STOCK
const missingItemMessage = (missingItems) => {
  let message = "<ul style='list-style-type: none; padding: 0;'>";

  missingItems.forEach((item) => {
    message += `<li style='display: flex; align-items: center; margin-bottom: 10px;'>
                  <img src="${item.img[0]}" alt="${item.title}" style='width: 100px; height: 100px; object-fit:contain; padding-right: 20px' />
                  <span style='font-weight: bold; color: black; padding-right: 20px'>${item.title}</span style ='color: black'> - <span> No stock </span>
                </li>`;
  });
  message += "</ul>";
  return message;
};

export const CartContainer = () => {
  const { windowWidth, setProgress, loading, setLoading, setVisible } = useContext(GlobalToolsContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    setVisible(true)
    setLoading(true)
    setProgress(2)
    setTimeout(() => {
      setLoading(false);
      if (loading === false) {
        setProgress(100);
      }
    }, 750);
  }, []);


  const realizarCompra = async () => {
    let isValid = true;
    const missingItems = [];

    for (const product of cart) {
      const productRef = doc(db, "products", product.id);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        // Producto no existe en Firebase
        isValid = false;
        missingItems.push(product);
      }

      const productData = productSnapshot.data();
      if (product.quantity > productData.stock) {
        // Cantidad de producto en localStorage excede el stock en Firebase
        isValid = false;
        missingItems.push(product);
      }
    }

    if (isValid) {
      navigate("/Checkout");
    } else {
      // Ya no hay stock de productos
      Swal.fire({
        title:
          "<span style='font-size: 1rem; color: black'>Some items in your cart are no longer available :</span>",
        html: missingItemMessage(missingItems),
      });
    }
  };

  return (
    <>
      {loading ? (
        <LoaderWrapper>
          {windowWidth > 600 ? (
            <Ring size={60} lineWeight={8} speed={2} color="black" />
          ) : (
            <Ring size={40} lineWeight={6} speed={2} color="black" />
          )}
        </LoaderWrapper>
      ) : windowWidth > 680 ? (
        <CartDesktop realizarCompra={realizarCompra} />
      ) : (
        <CartMobile realizarCompra={realizarCompra} />
      )}
    </>
  );
};
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 550px;
`;
