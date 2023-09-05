import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import { CartDesktop } from "./CartDesktop";
import { CartMobile } from "./CartMobile";
import { CartContext } from "../../context/CartContext";

//Swal Sweet Alert Message - NO AVAILABLE STOCK
const missingItemMessage = (missingItems) => {
  let message = "<ul style='list-style-type: none; padding: 0;'>";

  missingItems.forEach((item) => {
    message += `<li style='display: flex; align-items: center; margin-bottom: 10px;'>
                  <img src="${item.img}" alt="${item.title}" style='width: 100px; height: 100px; object-fit:contain; padding-right: 20px' />
                  <span style='font-weight: bold; color: black; padding-right: 20px'>${item.title}</span style ='color: black'> - <span> No stock </span>
                </li>`;
  });
  message += "</ul>";
  return message;
};

export const CartContainer = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const { windowWidth } = useContext(GlobalToolsContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

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
      {windowWidth > 680 ? (
        <CartDesktop realizarCompra={realizarCompra} />
      ) : (
        <CartMobile realizarCompra={realizarCompra} />
      )}
    </>
  );
};
