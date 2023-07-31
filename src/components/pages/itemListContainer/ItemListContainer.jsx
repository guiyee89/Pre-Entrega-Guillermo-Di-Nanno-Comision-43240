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


//////////////     //////////////    ////////////      ////////////      /////////////
export const ItemListContainer = () => {

  const [loading, setLoading] = useState(true); //Loader

  const [items, setItems] = useState([]); //Guardamos los items
  
  const { addToCart } = useContext(CartContext);//Utilizamos contexto para agregar al Cart
  
  const { categoryName } = useParams();//useParams de react-router-dom para filtrar productos por categoryName
 
  const categoryTitle = categoryName ? categoryName : "All Products"; // Rendering conditional title
 
  const navigate = useNavigate(); //Pasamos useNavigate() como prop


//////////////     //////////////    ////////////      ////////////      /////////////
  //FETCH TO FIRESTORE FOR COLLECTION DATABASE "products" AND FILTER BY categoryName
  useEffect(() => {
    setLoading(true);
    let itemsCollection = collection(db, "products");
    let filterCollection;
    if (!categoryName) {
      //If there is no categoryName, fetch all products
      filterCollection = itemsCollection;
    } else {
      //if there is categoryName, filter that category
      filterCollection = query(
        itemsCollection,
        where("category", "==", categoryName)
      );
    }
    setTimeout(() => {
      //getDocs to resolve the promise and fetch the products
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


//////////////     //////////////    ////////////      ////////////      /////////////
//     STATES TO MANAGE DATA BETWEEN COMPONENTS - MANAGE DATA TO FILTER ITEMS       //

 //States for MultfiFilter and ItemListcontainer data
 const [detailsFilters, setDetailsFilters] = useState([]);
 const [filteredItems, setFilteredItems] = useState([]);

 console.log(filteredItems);

 const handleFilterChange = (filteredItems, detailsFilters) => {
   if (filteredItems.length > 0) {
     setFilteredItems(filteredItems);
     setDetailsFilters(detailsFilters); // Set detailsFilters to the selected filters from MultiFilter
   } else {
     setFilteredItems([]); 
     setDetailsFilters([]); 
   }
 };


//////////////     //////////////    ////////////      ////////////      /////////////
//              FUNCTION TO ADD ITEMS DIRECTLY FROM ItemListContainer               //
  const onAddCart = (newItem) => {
    let quantity = 1;
    const productData = {
      ...newItem,
      quantity: quantity,
    };
    addToCart(productData);
  };



//////////////     //////////////    ////////////      ////////////      /////////////
//               SCROLLING EFFECT FOR FilterWrapper ON 22% OF SCREEN               //
  const [scroll, setScroll] = useState("not-scrolled");

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.innerHeight * 0.22; 
      if (window.scrollY > scrollHeight) {
        setScroll("scrolled");
      } else {
        setScroll("not-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



//    RENDERING    //  
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
            <FilterWrapper scrolled={scroll}>
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
  margin-bottom: 30px;
`;
const NoProductMessage = styled.h2`
  height: 500px;
  color: black;
`;
const FilterWrapper = styled.div`
  display: flex;
  width: 95%;
  max-width: ${(props) => (props.scrolled === "scrolled" ? "1371px" : "1375px")};;
  justify-content: ${(props) => (props.scrolled === "scrolled" ? "space-around" : "space-evenly")};;
  position: sticky;
  top: 66px;
  z-index: 1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: ${(props) => (props.scrolled === "scrolled" ? "20px 0 13px 0;" : "20px 0 25px 0;")};;
  background-color: ${(props) => (props.scrolled === "scrolled" ? "white" : "#f3efef")};
  box-shadow: ${(props) => (props.scrolled === "scrolled" ? "0 6px 10px rgba(0, 0, 0, 0.4)" : "none")};
  transition: background-color .11s ease-in-out; /* This defines the transition effect */
  height: ${(props) => (props.scrolled === "scrolled" ? "auto" : "70px")};
  transition: height 0.19s cubic-bezier(0, 1.32, 0, 0.68) 0s
  ${(props) => (props.scrolled === "scrolled" ? "0.19s" : "0.19s")}
  ease-in-out;
`;
