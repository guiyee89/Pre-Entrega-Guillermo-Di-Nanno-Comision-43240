// import { AgregarDocs } from "../../dashboard/AgregarDocs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "./ItemList";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components/macro";
import useScrollRestoration from "../../hooks/useScrollRestoration";
import { Ring } from "@uiball/loaders";
import { useContext } from "react";
import { GlobalToolsContext } from "../../context/GlobalToolsContext";
import { DesktopFilter } from "./filters/DesktopFilter";
import { MobileFilter } from "./filters/MobileFilter";

//////////////     //////////////    ////////////      ////////////      /////////////
export const ScrollRestorationWrapper = ({ children }) => {
  useScrollRestoration(); // Apply the scroll restoration hook
  return <>{children}</>; // Render the children content
};

//////////////     //////////////    ////////////      ////////////      /////////////
export const ItemListContainer = () => {
  const [items, setItems] = useState([]); //Guardamos los items
  const { categoryName } = useParams(); //useParams de react-router-dom para filtrar productos por categoryName
  const navigate = useNavigate(); //Pasamos useNavigate() como prop
  const {
    isFilterOpen,
    toggleFilterMenu,
    windowWidth,
    progress,
    setProgress,
    loading,
    setLoading,
    setVisible,
    progressComplete, 
    setProgressComplete
  } = useContext(GlobalToolsContext);


  //////////////     //////////////    ////////////      ////////////      /////////////
  //FETCH TO FIRESTORE FOR COLLECTION DATABASE "products" AND FILTER BY categoryName
  useEffect(() => {
    setProgress(0)
    setLoading(true);
    setVisible(true);
    const delay = 550;
    const timer = setTimeout(() => {
      let itemsCollection = collection(db, "products");
      let filterCollection;
      console.log("fetching ItemListContainer");
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
          console.log(products);
          setItems(products);
          setTimeout(() => {
            setLoading(false);
            setProgressComplete(true);
            if(progressComplete === true){
              setProgress(100)
            }
          }, 250); // Set loading to false and progressComplete true after a delay to avoid "No items found" message
        })
        .catch((err) => console.log(err));
    }, delay);

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, [categoryName]);

  //////////////     //////////////    ////////////      ////////////      /////////////
  //     STATES TO MANAGE DATA BETWEEN COMPONENTS - MANAGE DATA TO FILTER ITEMS       //

  //States for MultfiFilter and ItemListcontainer data
  const [detailsFilters, setDetailsFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); //Set currentPage and pass prop to ItemList
  const [itemsNotFound, setItemsNotFound] = useState(false); //Set message for no items found on Filter
  const [itemLoader, setItemLoader] = useState(false); // State to control the filtering loader

  const handleFilterChange = (filteredItems, detailsFilters) => {
    if (filteredItems.length > 0) {
      setFilteredItems(filteredItems);
      setDetailsFilters(detailsFilters); //Set detailsFilters to the selected filters from MultiFilter
      window.scrollTo({ /* top: 0, */ behavior: "instant" });
      /* setCurrentPage(); */ //Set filters on filterChanged to automatically change currentPage in ItemList
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
            {windowWidth > 600 ? (
              <Ring size={40} lineWeight={7} speed={2} color="black" />
            ) : (
              <Ring size={35} lineWeight={6} speed={2} color="black" />
            )}
          </LoaderWrapper>
        ) : (
          <>
            {/******  FILTER  ******/}
            {progressComplete && (
              <ItemsFiltersWrapper>
                {windowWidth > 900 && (
                  <DesktopFilterWrapper scrolled={scroll}>
                    <DesktopFilter
                      items={items}
                      onFilterChange={handleFilterChange}
                      setCurrentPage={setCurrentPage}
                      setItemLoader={setItemLoader}
                    />
                  </DesktopFilterWrapper>
                )}
                {windowWidth <= 900 && (
                  <MobileFilterWrapper
                    isFilterOpen={isFilterOpen}
                    onClick={toggleFilterMenu}
                  >
                    <MobileFilter
                      items={items}
                      onFilterChange={handleFilterChange}
                      setCurrentPage={setCurrentPage}
                      setItemLoader={setItemLoader}
                    />
                  </MobileFilterWrapper>
                )}

                <ItemListWrapper>
                  {/* RENDERING ITEMS */}
                  {filteredItems.length > 0 ? (
                    <ItemList
                      items={filteredItems}
                      navigate={navigate}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemLoader={itemLoader}
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
            )}
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
const DesktopFilterWrapper = styled.aside`
  display: flex;
  grid-column: 1 / 2;
  gap: 0.5rem;
  flex-direction: column;
  margin: 5px 8px 0px 0px;
  height: 750px;
  min-width: 255px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  position: sticky;
  top: 110px;
  background-color: rgb(253, 253, 253);
  @media (max-width: 1050px) {
    min-width: 200px;
    padding-left: 5px;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
const MobileFilterWrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isFilterOpen }) => (isFilterOpen ? "-420px" : "0")};
  transition: right 0.3s ease-in-out;
  z-index: 1;
  min-width: 225px;
  max-width: 320px;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
const ItemListWrapper = styled.div`
  grid-column: 2/13;
  margin-top: -3px;
  @media (max-width: 900px) {
    grid-column: 1/13;
    margin: 0 auto;
  }
  @media (max-width: 650px) {
    margin: 0;
  }
`;
const ItemsFiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100%;
  max-width: 1618px;
  margin-left: -20px;
`;
