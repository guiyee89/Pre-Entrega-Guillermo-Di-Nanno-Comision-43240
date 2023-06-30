import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "./ItemList";
import { products } from "../../../ProductsMock";
import { LoaderContainer } from "../../common/loaders/LoaderContainer";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { ToasterContainer } from "../../common/loaders/ToasterContainer";
import "react-toastify/dist/ReactToastify.css";


export const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  //Guardamos los items
  const [items, setItems] = useState([]);

  const { addToCart } = useContext(CartContext);

  //useParams de react-router-dom para filtrar productos por categoryName
  const { categoryName } = useParams();

 
  //Funcion con useEffect para filtrar productos
  useEffect(() => {
    //seteamos loader en true
    setLoading(true);
    const productosFiltrados = products.filter(
      (product) => product.category === categoryName
    );

    //Promesa para que se resuelva que tipo de productos mostrar
    const productosPromesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(categoryName ? productosFiltrados : products);
        reject;
      }, 2200);

      //Una vez resuelto, mostrar dichos productos
    });
    productosPromesa
      .then((response) => {
        setItems(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    //Cierro con arreglo de dependencia para ejectuar cada vez que cambie "categoryName"
  }, [categoryName]);

  //Funcion para agregar items y cantidad desde ItemList
  const onAddCart = (newItem) => {
    let quantity = 1;
    const productData = {
      ...newItem,
      quantity: quantity,
    };
      notify()
      addToCart(productData);
  };

   //Funcion Toastify
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

  const notify2 = () => {
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
          success: "Max stock reached",
          error: "Max stock reached",
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

  //Rendering condicional
  return (
    <div>
      <ToasterContainer />
      {loading ? (
        <LoaderContainer />
      ) : (
        <ItemList items={items} onAddCart={onAddCart} />
      )}
    </div>
  );
};
