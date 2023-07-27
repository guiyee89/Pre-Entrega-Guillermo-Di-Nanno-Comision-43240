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
import { MultiFilter } from "./multiFilter/MultiFilter";
import { AgregarDocs } from "../../dashboard/AgregarDocs";

export const ItemListContainer = () => {
  //Loader
  const [loading, setLoading] = useState(true);
  //Guardamos los items
  const [items, setItems] = useState([]);
  //Utilizamos contexto para agregar al Cart
  const { addToCart } = useContext(CartContext);
  //useParams de react-router-dom para filtrar productos por categoryName
  const { categoryName } = useParams();
  // Rendering conditional title
  const categoryTitle = categoryName ? categoryName : "All Products";
  //Pasamos useNavigate() como prop
  const navigate = useNavigate();

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
    }, 500);
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

  //States de filtrados para pasar como evento a ItemListContainer
  const [detailsFilters, setDetailsFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(filteredItems);
  const handleFilterChange = (filteredItems, detailsFilters) => {
    if (filteredItems.length > 0) {
      setFilteredItems(filteredItems);
      setDetailsFilters(detailsFilters); // Setea detailsFilters a los filtros recibidos de MultiFilter
    } else {
      setFilteredItems([]); // Setea filteredItems como array vacio
      setDetailsFilters([]); // Setea detailsFilters como array vacio
    }
  };

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

          {/******  FILTER  ******/}
          <FilterWrapper>
            <MultiFilter items={items} onFilterChange={handleFilterChange} />
          </FilterWrapper>

          {filteredItems.length > 0 && (
            <ItemList
              items={filteredItems}
              onAddCart={onAddCart}
              navigate={navigate}
            />
          )}
          {filteredItems.length < 0 && (
            <ItemList items={items} onAddCart={onAddCart} navigate={navigate} />
          )}
          {detailsFilters.length === 0 && (
            <>
              <ItemList
                items={detailsFilters}
                onAddCart={onAddCart}
                navigate={navigate}
              />
              <NoProductMessage>
                There are no products with this filter criteria.
              </NoProductMessage>
            </>
          )}
        </>
      )}
      <AgregarDocs />
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
`;
const NoProductMessage = styled.h2`
  height: 500px;
  color: black;
`;
const FilterWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
`;
