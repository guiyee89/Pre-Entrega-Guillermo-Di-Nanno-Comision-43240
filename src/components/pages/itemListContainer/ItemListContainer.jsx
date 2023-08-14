import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "./ItemList";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
import styled from "styled-components/macro";
import { MultiFilter } from "./MultiFilter";
import { Pagination, PaginationItem } from "@mui/material";
// import { AgregarDocs } from "../../dashboard/AgregarDocs";

//////////////     //////////////    ////////////      ////////////      /////////////
export const ItemListContainer = () => {
  const [loading, setLoading] = useState(true); //Loader
  const [items, setItems] = useState([]); //Guardamos los items
  const { categoryName } = useParams(); //useParams de react-router-dom para filtrar productos por categoryName
  const categoryTitle = categoryName ? categoryName : "All  Categories"; // Rendering conditional title
  const navigate = useNavigate(); //Pasamos useNavigate() como prop

  //////////////     //////////////    ////////////      ////////////      /////////////
  //FETCH TO FIRESTORE FOR COLLECTION DATABASE "products" AND FILTER BY categoryName
  // useEffect(() => {
  //   console.log("fetching...");
  //   setLoading(true);
  //   let itemsCollection = collection(db, "products");
  //   let filterCollection;
  //   if (!categoryName) {
  //     //If there is no categoryName, fetch all products
  //     filterCollection = itemsCollection;
  //   } else {
  //     //if there is categoryName, filter that category
  //     filterCollection = query(
  //       itemsCollection,
  //       where("category", "==", categoryName)
  //     );
  //   }

  //   setTimeout(() => {
  //     //getDocs to resolve the promise and fetch the products
  //     getDocs(filterCollection)
  //       .then((res) => {
  //         let products = res.docs.map((product) => {
  //           return {
  //             ...product.data(),
  //             id: product.id,
  //           };

  //         });
  //         console.log(products)
  //         setItems(products);
  //         setLoading(false);
  //       })

  //       .catch((err) => console.log(err));
  //   }, 0);

  // }, [categoryName]);

  useEffect(() => {
    console.log("Fetching items from Firestore...");
    setLoading(true);

    const delay = 700;
    const timer = setTimeout(() => {
      let itemsCollection = collection(db, "products");
      let filterCollection;

      if (!categoryName) {
        filterCollection = itemsCollection;
      } else {
        filterCollection = query(
          itemsCollection,
          where("category", "==", categoryName)
        );
      }

      getDocs(filterCollection)
        .then((res) => {
          const products = res.docs.reduce((filtered, productDoc) => {
            const product = productDoc.data();
            const { userId, color } = product;
            const key = `${userId}-${color}`;
            // Check if the product's customId and color combination already exists
            if (
              !filtered.some((item) => `${item.userId}-${item.color}` === key)
            ) {
              filtered.push({
                ...product,
                id: productDoc.id,
              });
            }
            return filtered;
          }, []);
          console.log(products);

          setItems(products);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }, delay);
    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, []);

  //////////////     //////////////    ////////////      ////////////      /////////////
  //     STATES TO MANAGE DATA BETWEEN COMPONENTS - MANAGE DATA TO FILTER ITEMS       //

  //States for MultfiFilter and ItemListcontainer data
  const [detailsFilters, setDetailsFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);//Set currentPage and pass prop to ItemList

  const handleFilterChange = (filteredItems, detailsFilters) => {
    if (filteredItems.length > 0) {
      setFilteredItems(filteredItems);
      setDetailsFilters(detailsFilters); //Set detailsFilters to the selected filters from MultiFilter
      setCurrentPage(1); //Set filters on filterChanged to automatically change currentPage in ItemList
    } else {
      setFilteredItems([]);
      setDetailsFilters([]);
    }
  };


  //////////////     //////////////    ////////////      ////////////      /////////////
  //                               RENDERING                                         //
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
            <MultiFilter
              items={items}
              onFilterChange={handleFilterChange}
            />
          </FilterWrapper>

  
          {/* RENDERING ITEMS */}
          {filteredItems.length > 0 && (
            <ItemList
              items={filteredItems}
              navigate={navigate}
              detailsFilters={detailsFilters}
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
            />
          )}
          {/* No products message */}
          {filteredItems.length === 0 && detailsFilters.length > 0 && (
            <>
              <ItemList
                items={filteredItems} 
                navigate={navigate}
                detailsFilters={detailsFilters}
                 currentPage={currentPage}
                 setCurrentPage={setCurrentPage}
              />
              <NoProductMessage>
                There are no products with this filter criteria.
              </NoProductMessage>
            </>
          )}
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
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: capitalize;
  margin: 50px auto 15px;
`;
const NoProductMessage = styled.h2`
  height: 500px;
  color: black;
`;
const FilterWrapper = styled.div`
  display: flex;
  width: 95%;
  margin-bottom: 12px;
  align-items: center;
  max-width: 1246px;
  justify-content: space-between;
  position: sticky;
  top: 65px;
  z-index: 1;
  padding: 20px 20px 17px;
  height: 60px;
  background-color: rgb(253, 253, 253);
  border-bottom: 1px solid rgba(133, 132, 132, 0.2);
`;
const PaginationWrapper = styled.div`
  max-width: 100%;
  margin: 15px auto 30px;
`;
