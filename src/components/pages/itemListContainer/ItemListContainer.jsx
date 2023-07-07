import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "./ItemList";
import { CartContext } from "../../context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import LoaderBar from "../../common/loaders/LoaderBar";
import ToasterContainer from "../../common/loaders/ToasterContainer";

// import { AgregarDocs } from "../../../AgregarDocs";

export const ItemListContainer = () => {
  const [loading, setLoading] = useState(true);
  //Guardamos los items
  const [items, setItems] = useState([]);

  const { addToCart } = useContext(CartContext);

  //useParams de react-router-dom para filtrar productos por categoryName
  const { categoryName } = useParams();

  //Pasamos useNavigate() como prop
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let itemsCollection = collection(db, "products");
    let filterCollection;
    if (!categoryName) {
      //si categoryName no es = a alguna category, trae todos los productos (itemCollection)
      filterCollection = itemsCollection;
    } else {
      //si categoryName es = a alguna category, filtra los productos
      filterCollection = query(
        itemsCollection,
        where("category", "==", categoryName)
      );
    }

    setTimeout(() => {
      //getDocs es como la promesa para que se resuelva la peticion a firebase
      getDocs(filterCollection)
        .then((res) => {
          let products = res.docs.map((product) => {
            return {
              ...product.data(),
              id: product.id,
            };
          });
          setItems(products);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, [categoryName]);

  //Funcion para agregar items y cantidad desde ItemList
  const onAddCart = (newItem) => {
    let quantity = 1;
    const productData = {
      ...newItem,
      quantity: quantity,
    };
    addToCart(productData);
  };

  //Rendering condicional
  return (
    <div>
      <ToasterContainer />
      {loading ? (
        <LoaderBar />
      ) : (
        <ItemList items={items} onAddCart={onAddCart} navigate={navigate} />
      )}
    </div>
  );
};
