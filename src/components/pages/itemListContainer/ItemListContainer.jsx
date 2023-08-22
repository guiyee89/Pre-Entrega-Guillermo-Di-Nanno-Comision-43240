import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "./ItemList";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components/macro";
import { MultiFilter } from "./MultiFilter";
import useScrollRestoration from "../../hooks/useScrollRestoration";
import { Ring } from "@uiball/loaders";
// import { AgregarDocs } from "../../dashboard/AgregarDocs";

export const ScrollRestorationWrapper = ({ children }) => {
  useScrollRestoration(); // Apply the scroll restoration hook
  return <>{children}</>; // Render the children content
};

//////////////     //////////////    ////////////      ////////////      /////////////
export const ItemListContainer = () => {
  const [loading, setLoading] = useState(true); //Loader
  const [items, setItems] = useState([]); //Guardamos los items
  const { categoryName } = useParams(); //useParams de react-router-dom para filtrar productos por categoryName
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
    setLoading(true);

    const delay = 1050;
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
          console.log("fetching itemList...");
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
  const [currentPage, setCurrentPage] = useState(1); //Set currentPage and pass prop to ItemList
  const [itemsNotFound, setItemsNotFound] = useState(false);//Set message for no items found on Filter

  const handleFilterChange = (filteredItems, detailsFilters) => {
    if (filteredItems.length > 0) {
      setFilteredItems(filteredItems);
      setDetailsFilters(detailsFilters); //Set detailsFilters to the selected filters from MultiFilter
      /* setCurrentPage(); */ //Set filters on filterChanged to automatically change currentPage in ItemList
      window.scrollTo({ /* top: 0, */ behavior: "instant" });
    } else {
      setFilteredItems([]);
      setDetailsFilters([]);
      setItemsNotFound(true);
    }
  };

  //////////////     //////////////    ////////////      ////////////      /////////////
  //                                    RENDERING                                    //
  return (
    <>
      <ScrollRestorationWrapper>
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
            <Ring size={60} lineWeight={8} speed={2} color="black" />
          </LoaderWrapper>
        ) : (
          <>
            {/******  FILTER  ******/}
            <ItemsFiltersWrapper>
              <FilterWrapper scrolled={scroll}>
                <MultiFilter
                  items={items}
                  onFilterChange={handleFilterChange}
                  setCurrentPage={setCurrentPage}
                />
              </FilterWrapper>
              <ItemListWrapper>
                {/* RENDERING ITEMS */}
                {filteredItems.length > 0 ? (
                  <ItemList
                    items={filteredItems}
                    navigate={navigate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                ) : (
                  itemsNotFound && (
                    <NoProductMessage>
                      No items found with this filter criteria
                    </NoProductMessage>
                  )
                )}
              </ItemListWrapper>
            </ItemsFiltersWrapper>
          </>
        )}
        {/* <AgregarDocs /> */}
      </ScrollRestorationWrapper>
    </>
  );
};


const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 550px;
  margin-left: 35px;
`;

const NoProductMessage = styled.h2`
  padding-top: 140px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
  height: 500px;
  color: black;
`;
const FilterWrapper = styled.aside`
  display: flex;
  grid-column: 1 / 2;
  gap: 0.5rem;
  flex-direction: column;
  margin: 5px 8px 0px 0px;
  height: 1110px;
  min-width: 255px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  position: sticky;
  top: 110px;
  background-color: rgb(253, 253, 253);
`;
const ItemListWrapper = styled.div`
  grid-column: 2/13;
`;
const ItemsFiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
  max-width: 1618px;
  margin-left: -20px;
`;
