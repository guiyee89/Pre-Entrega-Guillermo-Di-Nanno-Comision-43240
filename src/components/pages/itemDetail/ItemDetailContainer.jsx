import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { products } from "../../../ProductsMock";
import { CartContext } from "../../context/CartContext";
import { ToasterContainer } from "../../common/loaders/ToasterContainer";
import { LoaderContainer } from "../../common/loaders/LoaderContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ItemDetailContainer = () => {
  //Guardamos los items (objetos)
  const [selectedItem, setSelectedItem] = useState({});

  //PROVEEMOS EL "CONTEXTO"
  const { addToCart, getTotalQuantityById } = useContext(CartContext);

  const { id } = useParams();

  const quantityId = getTotalQuantityById(id);

  //Toastify alert para onAdd function
  const notify = () => {
    toast
      .promise(
        // Promise function
        new Promise((resolve) => {
          // Simulate asynchronous operation
          setTimeout(() => {
            // Resolve the promise after 1.5 seconds
            resolve();
          }, 1200);
        }),
        {
          pending: "Adding to Cart...",
          success: "Added successfully!",
          error: "Error on adding product!",
        }
      )
      .then(() => {
        // Promise resolved
        console.log("Promise resolved");
      })
      .catch((error) => {
        // Promise encountered an error
        console.log("Promise error:", error);
      });
  };

  //AGREGAMOS PRODUCTOS AL CARRITO
  const onAdd = (quantity) => {
   
    let data = {
      ...selectedItem,
      quantity: quantity,
    };
    //Toastify
    notify();
    //Agregamos la "data" de los productos con la funcion de contexto
    addToCart(data);
    setSelectedItem({ ...selectedItem, quantity: 1}); //Reset count inicial a 1
  };

  //ENCONTRAMOS PRODUCTOS POR "ID" Y RESOLVEMOS PROMISE PARA RENDERIZAR
  useEffect(() => {
    const itemId = products.find((product) => product.id === +id); // o Number.id
    const productId = new Promise((resolve) => {
      setTimeout(() => {
        resolve(itemId);
      }, 1600);
    });
    productId
      .then((resolve) => setSelectedItem(resolve))
      .catch((error) => console.log("No se encuentra el detalle: ", error));
  }, [id]);

  return (
    <>
      <ToasterContainer />
      {selectedItem.id ? (
        <ItemDetail
          selectedItem={selectedItem}
          onAdd={onAdd}
          addToCart={addToCart}
          quantityId={quantityId}
        />
      ) : (
        <LoaderContainer />
      )}
    </>
  );
};
