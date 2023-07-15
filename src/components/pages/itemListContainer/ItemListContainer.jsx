import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "./ItemList";
import { CartContext } from "../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
import styled from "styled-components/macro";
// import { AgregarDocs } from "../../dashboard/AgregarDocs";


export const ItemListContainer = () => {

  //Loader
  const [loading, setLoading] = useState(true);

  //Guardamos los items
  const [items, setItems] = useState([]);

  //Utilizamos contexto para agregar al Cart
  const { addToCart } = useContext(CartContext);

  //useParams de react-router-dom para filtrar productos por categoryName
  const { categoryName } = useParams();

  //Pasamos useNavigate() como prop
  const navigate = useNavigate();

  // Rendering conditional title
  const categoryTitle = categoryName ? categoryName : "All Products";

  //Creamos filtro de productos en NavBar por categoria
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
    }, 1000);
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
          <BarLoader color="#12352e" width={250} />
        </LoaderWrapper>
      ) : (
        <>
        <ItemListTitle>{categoryTitle}</ItemListTitle>
        <ItemList items={items} onAddCart={onAddCart} navigate={navigate} />
        </>
      )}
      {/* <AgregarDocs /> */}
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
const ItemListTitle = styled.h1`
  width: 100%;
  color: #2b2929;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
`