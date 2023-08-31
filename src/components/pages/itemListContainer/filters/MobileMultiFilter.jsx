import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { css } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { SideMenuContext } from "../../../context/SideMenuContext";

export const MobileMultiFilter = ({
  items,
  onFilterChange,
  setCurrentPage,
}) => {
  //////////           ////////////           ////////////           ///////////           ///////////
  //                                 CONTEXT                                  //
  const { isFilterOpen, toggleFilterMenu } = useContext(SideMenuContext);

  //////////           ////////////           ////////////           ///////////           ///////////
  //                       STATE FOR DIFFERENT FILTERS                        //
  const [detailsFilters, setDetailsFilters] = useState({
    category: "",
    size: "",
    color: "",
    orderBy: "",
  });

  //////////           ////////////           ////////////           ///////////           ///////////
  //      MAPING COLORS, SIZE, CATEGORIES AND QUANTITY FOR EACH FILTER        //

  //----------       CATEGORY MAPING      ---------//
  const uniqueCategory = Array.from(
    new Set(items.map((item) => item.category))
  );

  //----------        SIZE MAPING       ----------//
  /* const uniqueSizes = Array.from(new Set(items.map((item) => item.size)));
  console.log(uniqueSizes) */
  const sizeMapping = {
    xs: "xs",
    s: "s",
    m: "m",
    l: "l",
    xl: "xl",
    xxl: "xxl",
    39: "39",
    40: "40",
    41: "41",
    42: "42",
    43: "43",
    44: "44",
  };

  //----------       COLOR MAPING      ----------//
  // Define a mapping of color names to CSS color values
  const colorMapping = {
    black: "#000000",
    white: "#ffffff",
    grey: "#8e8e8e",
    blue: "#2626e4",
    purple: "#dc10ce",
    pink: "#ea7baf",
    red: "#e81a1a",
    orange: "#f49d2c",
    yellow: "#e6d21a",
    green: "#24df13",
    brown: "#682f21",
  };
  //function to find first color
  const getFirstColorWord = (color) => {
    const words = color.split(" ");
    console.log(words);
    return words[0];
  };

  //////////           ////////////           ////////////           ///////////           ///////////
  //                                FILTERING LOGIC FOR ALL ITEMS                                  //
  const { categoryName } = useParams();

  // Fetch items from Firestore Database and filter accordingly on selection
  const fetchFilteredItems = async () => {
    try {
      const filteredCollection = collection(db, "products");
      let queryFilters = [];
      if (categoryName) {
        queryFilters.push(where("category", "==", categoryName));
      }
      if (detailsFilters.category.length > 0) {
        queryFilters.push(where("category", "in", detailsFilters.category));
      }
      if (detailsFilters.size.length > 0) {
        queryFilters.push(where("size", "in", detailsFilters.size));
      }
      /* if (detailsFilters.color.length > 0) {
       queryFilters.push(where("color", "in", detailsFilters.color));
    }    */

      const filteredQuery = query(filteredCollection, ...queryFilters);
      const querySnapshot = await getDocs(filteredQuery);

      // Use a Set to track unique userId-color combinations
      const uniqueItems = new Set();
      const filteredItems = querySnapshot.docs.reduce((filtered, doc) => {
        const item = doc.data();
        const key = `${item.userId}-${item.color}`;

        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          // Check if any color filter matches with any word in the item's color
          if (
            detailsFilters.color.length === 0 ||
            detailsFilters.color.some((colorFilter) =>
              item.color.includes(colorFilter)
            )
          ) {
            filtered.push({
              id: doc.id,
              ...item,
            });
          }
        }
        return filtered;
      }, []);

      let orderedItems = [...filteredItems];

      // Apply the ordering logic
      if (detailsFilters.orderBy === "discount") {
        orderedItems = orderedItems.filter(
          (item) => item.discount !== undefined
        );
      } else if (detailsFilters.orderBy === "lowPrice") {
        orderedItems.sort((a, b) => {
          const priceA = "discountPrice" in a ? a.discountPrice : a.price;
          const priceB = "discountPrice" in b ? b.discountPrice : b.price;
          return priceA - priceB;
        });
      } else if (detailsFilters.orderBy === "highPrice") {
        orderedItems.sort((a, b) => {
          const priceA = "discountPrice" in a ? a.discountPrice : a.price;
          const priceB = "discountPrice" in b ? b.discountPrice : b.price;
          return priceB - priceA;
        });
      }
      console.log("fetching MultiFilter...");
      console.log(orderedItems);

      onFilterChange(orderedItems, detailsFilters);
    } catch (error) {
      console.error("Error fetching filtered items:", error);
    }
  };

  //ORDER BY - filtering logic according if filtered items or original items are being rendered
  useEffect(() => {
    setTimeout(() => {
      if (
        detailsFilters.category.length === 0 &&
        detailsFilters.size.length === 0 &&
        detailsFilters.color.length === 0
      ) {
        // If no filters are applied, order the original items by the selected ordering option
        let orderedItems = [...items];
        if (detailsFilters.orderBy === "discount") {
          orderedItems = orderedItems.filter(
            (item) => item.discount !== undefined
          );
        } else if (detailsFilters.orderBy === "lowPrice") {
          orderedItems.sort((a, b) => {
            const priceA = "discountPrice" in a ? a.discountPrice : a.price;
            const priceB = "discountPrice" in b ? b.discountPrice : b.price;
            return priceA - priceB;
          });
        } else if (detailsFilters.orderBy === "highPrice") {
          orderedItems.sort((a, b) => {
            const priceA = "discountPrice" in a ? a.discountPrice : a.price;
            const priceB = "discountPrice" in b ? b.discountPrice : b.price;
            return priceB - priceA;
          });
        }
        onFilterChange(orderedItems, detailsFilters);
      } else {
        // If filters are applied, fetch and order filtered items
        fetchFilteredItems();
      }
    }, 300);
  }, [detailsFilters]);

  //////////           ////////////           ////////////           ///////////           ///////////
  //                    HANDLE FILTERED ITEMS & PASS VALUE TO ItemListContainer                    //
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [itemsNotFound, setItemsNotFound] = useState(false);

  //Handle each filter change and pass the values
  const handleDetailsFilterChange = (filterName, value) => {
    setTimeout(() => {
      setDetailsFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: value,
      }));
      setCurrentPage(1); //Set pagiination to 1 if filters changed
    }, 1550);
    handleLoadDetail();
  };

  const updateFilterArray = (array, value, add) => {
    // Helper function to update filter array
    if (add) {
      return [...array, value];
    }
    return array.filter((item) => item !== value);
  };

  //////////           ////////////           ////////////           ///////////           ///////////
  //           LOADER            //
  const handleLoadDetail = () => {
    setLoadingDetail(true);
    setTimeout(() => {
      setLoadingDetail(false);
    }, 1600);
  };

  //////////           ////////////           ////////////           ///////////           ///////////
  //                                MANAGING FILTERS BY localStorage                               //
  // Load selected filters from localStorage when the component mounts
  useEffect(() => {
    const storedFilters = localStorage.getItem("selectedFilters");
    if (storedFilters) {
      setDetailsFilters(JSON.parse(storedFilters));
    }
  }, []);

  // Update localStorage when the detailsFilters state changes
  useEffect(() => {
    localStorage.setItem("selectedFilters", JSON.stringify(detailsFilters));
  }, [detailsFilters]);

  //////////           ////////////           ////////////           ///////////           ///////////
  return (
    <>
      <SideFilterWrapper isFilterOpen={isFilterOpen} onClick={toggleFilterMenu}>
        <FilterHeader>
          <CloseIcon
            onClick={toggleFilterMenu}
            sx={{
              fontSize: "35px",
              marginTop: "15px",
              marginLeft: "15px",
              cursor: "pointer",
            }}
          />
          <FilterBy>Filters</FilterBy>
          <ResetAllBtn
            onClick={() => {
              //Reset General Filters
              setTimeout(() => {
                setDetailsFilters((prevFilters) => ({
                  ...prevFilters,
                  category: "",
                  size: "",
                  color: "",
                  orderBy: "",
                }));
              }, 1500);
              handleLoadDetail();
            }}
          >
            Reset all filters
          </ResetAllBtn>
        </FilterHeader>
        <FilterWrapper>
          {/*      Loader Circle      */}
          <Loader>
            {loadingDetail && <ClipLoader color="#194f44" size={60} />}
          </Loader>

          {/****************      GENERAL FILTER       ****************/}
          <Accordion defaultExpanded sx={styles.expandedAccordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "22px",
                  fontSize: "1.1rem",
                  color: "#555454",
                }}
              >
                Order by
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                sx={{
                  justifyContent: "flex-end",
                  marginLeft: "-37px",
                  marginRight: "50px",
                }}
                control={
                  <OrderByWrapper>
                    <OrderByBtn
                      active={detailsFilters.orderBy === ""}
                      onClick={() => {
                        handleDetailsFilterChange("orderBy", "");
                      }}
                    >
                      No order
                    </OrderByBtn>
                    <OrderByBtn
                      active={detailsFilters.orderBy === "discount"}
                      onClick={() => {
                        handleDetailsFilterChange("orderBy", "discount");
                      }}
                    >
                      Discount Only
                    </OrderByBtn>
                    <OrderByBtn
                      active={detailsFilters.orderBy === "lowPrice"}
                      onClick={() => {
                        handleDetailsFilterChange("orderBy", "lowPrice");
                      }}
                    >
                      Lower Price
                    </OrderByBtn>
                    <OrderByBtn
                      active={detailsFilters.orderBy === "highPrice"}
                      onClick={() => {
                        handleDetailsFilterChange("orderBy", "highPrice");
                      }}
                    >
                      Higher Price
                    </OrderByBtn>
                  </OrderByWrapper>
                }
              />
            </AccordionDetails>
          </Accordion>

          {/****************      CATEGORY FILTER       ****************/}
          <Accordion defaultExpanded sx={styles.expandedAccordion}>
            <AccordionSummary
              sx={{
                "&.Mui-expanded": {
                  minHeight: "0px",
                  height: "30px",
                },
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "22px",
                  fontSize: "1.1rem",
                  color: "#555454",
                }}
              >
                Categories
              </Typography>
            </AccordionSummary>
            <ClearFilterBtn
              onClick={() => {
                //Reset section filters
                setTimeout(() => {
                  setDetailsFilters((prevFilters) => ({
                    ...prevFilters,
                    category: "",
                  }));
                }, 1500);
                handleLoadDetail();
              }}
            >
              Clear filters
            </ClearFilterBtn>
            <AccordionDetails sx={{ paddingTop: "18px", minWidth: "212px" }}>
              {uniqueCategory.map((category, index) => (
                <FormControlLabel
                  key={index}
                  sx={{
                    ...selectStyle,
                    marginBottom: "3px",
                    textTransform: "capitalize",
                  }}
                  control={
                    <Checkbox
                      sx={{
                        color: "#202932",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                      checked={detailsFilters.category.includes(category)}
                      onChange={(e) =>
                        handleDetailsFilterChange(
                          //Handle details function
                          "category",
                          updateFilterArray(
                            detailsFilters.category,
                            category,
                            e.target.checked
                          )
                        )
                      }
                    />
                  }
                  label={category}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/****************      SIZE FILTER       ****************/}
          <Accordion defaultExpanded sx={styles.expandedAccordion}>
            <AccordionSummary
              sx={{
                "&.Mui-expanded": {
                  minHeight: "0px",
                  height: "30px",
                },
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  minWidth: "112px",
                  fontWeight: "bold",
                  marginLeft: "22px",
                  fontSize: "1.1rem",
                  color: "#555454",
                }}
              >
                Sizes
              </Typography>
            </AccordionSummary>
            <ClearFilterBtn
              onClick={() => {
                setTimeout(() => {
                  setDetailsFilters((prevFilters) => ({
                    //Reset section filters
                    ...prevFilters,
                    size: "",
                  }));
                }, 1500);
                handleLoadDetail();
              }}
            >
              Clear filters
            </ClearFilterBtn>
            <AccordionDetails sx={{ padding: "35px 37px 16px 16px" }}>
              <Grid container spacing={0}>
                {Object.keys(sizeMapping)
                  /* uniqueSizes */ .sort((a, b) => {
                    const sizeOrder = {
                      xs: 1,
                      s: 2,
                      m: 3,
                      l: 4,
                      xl: 5,
                      xxl: 6,
                    };
                    const aOrder = sizeOrder[a] || parseInt(a, 12) || 9999;
                    const bOrder = sizeOrder[b] || parseInt(b, 12) || 9999;
                    return aOrder - bOrder;
                  })
                  .map((size, index) => (
                    <Grid item xs={6} key={index}>
                      <CheckboxWrapper>
                        <SizeCheckboxLabel>
                          <SizeCheckboxInput
                            type="checkbox"
                            checked={detailsFilters.size.includes(size)}
                            onChange={(e) =>
                              handleDetailsFilterChange(
                                //Handle details function
                                "size",
                                updateFilterArray(
                                  detailsFilters.size,
                                  size,
                                  e.target.checked
                                )
                              )
                            }
                          />
                          <Typography
                            sx={{
                              fontWeight:
                                detailsFilters.size.includes(size) && "bold",
                              fontSize: "0.9rem",
                            }}
                          >
                            {size}
                          </Typography>
                        </SizeCheckboxLabel>
                      </CheckboxWrapper>
                    </Grid>
                  ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/****************      COLOR FILTER       ****************/}
          <Accordion defaultExpanded sx={styles.expandedAccordion}>
            <AccordionSummary
              sx={{
                "&.Mui-expanded": {
                  minHeight: "0px",
                  height: "30px",
                },
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "22px",
                  fontSize: "1.1rem",
                  color: "#555454",
                }}
              >
                Colors
              </Typography>
            </AccordionSummary>
            <ClearFilterBtn
              onClick={() => {
                //Reset section filters
                setTimeout(() => {
                  setDetailsFilters((prevFilters) => ({
                    ...prevFilters,
                    color: "",
                  }));
                }, 1500);
                handleLoadDetail();
              }}
            >
              Clear filters
            </ClearFilterBtn>
            <AccordionDetails sx={{ padding: "20px 26px 20px 37px" }}>
              <Grid container spacing={1}>
                {/* Use the Grid container */}
                {Object.keys(colorMapping).map((colorKey, index) => {
                  const checkBoxColors = colorMapping[colorKey].split(" , "); //background color for checkboxes
                  const checkBoxStyle =
                    checkBoxColors.length > 1
                      ? `${checkBoxColors[0]}, ${checkBoxColors[1]}`
                      : checkBoxColors[0];

                  return (
                    <Grid item xs={6} key={index}>
                      <FormControlLabel
                        sx={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          margin: "8px 0 10px 0",
                          textTransform: "capitalize",
                        }}
                        control={
                          <ColorCheckbox
                            type="checkbox"
                            style={{
                              background: checkBoxStyle,
                            }}
                            checked={detailsFilters.color.includes(colorKey)}
                            onChange={(e) =>
                              handleDetailsFilterChange(
                                "color",
                                updateFilterArray(
                                  detailsFilters.color,
                                  /* getFirstColorWord(colorKey), */ //get first word value of property "color" in the object
                                  colorKey,
                                  e.target.checked
                                )
                              )
                            }
                          />
                        }
                        label={
                          <Typography
                            sx={{
                              fontSize: "0.83rem", // Add the desired font size
                              paddingTop: "3px",
                            }}
                          >
                            {colorKey}
                          </Typography>
                        }
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </FilterWrapper>
      </SideFilterWrapper>
    </>
  );
};

//MATERIAL UI STYLES
const SideFilterWrapper = styled.div`
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
const FilterHeader = styled.div`
  display: flex;
  width: 90%;
  -webkit-box-pack: center;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
`;
const FilterBy = styled.p`
  font-weight: bold;
  margin-right: 25px;
`;
const ResetAllBtn = styled.button`
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  background-color: transparent;
  margin-right: -25px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 7%;
    width: 90%;
    height: 2px;
    background-color: black;
  }
  &:hover {
    color: #00a6ff;
  }
`;
const ClearFilterBtn = styled.button`
  font-size: 0.76rem;
  font-weight: 600;
  border: none;
  background-color: transparent;
  margin: 24px 0 0 32px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 7%;
    width: 90%;
    height: 1px;
    background-color: black;
  }
  &:hover {
    color: #00a6ff;
  }
`;
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 68%;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  border-bottom: 1px solid lightgrey;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  ::-webkit-scrollbar-track {
    background-color: #f6f6f6;
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 25%;
  left: 71%;
  z-index: 1;
`;
const styles = {
  expandedAccordion: css`
    margin: 0px 14px 0 24px !important;
    border-top: 1px solid lightgray;
    box-shadow: none;
    padding: 16px 0;
  `,
};
const selectStyle = {
  m: 1,
  height: 35,
  width: 100,
};
const OrderByWrapper = styled.div`
  width: 69%;
  margin-left: 18px;
`;
const OrderByBtn = styled.button`
  width: 100%;
  text-align: inherit;
  border-radius: 3%;
  margin-bottom: 5px;
  padding: 5px;
  color: black;
  font-size: 0.85rem;
  background-color: ${(props) =>
    props.active ? "#dbe4f5" : "rgb(244, 244, 244);"};
  border: ${(props) =>
    props.active ? "1px solid #857a7a" : "1px solid lightgrey"};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
`;
const ColorCheckbox = styled.input`
  appearance: none;
  outline: none;
  cursor: pointer;
  margin-left: 1px;
  border-radius: 50%;
  width: ${({ checked }) => (checked ? "38px" : "24px")};
  height: ${({ checked }) => (checked ? "38px" : "24px")};
  background-color: ${({ color }) => color};
  border: ${({ checked }) =>
    checked ? "1px solid black" : "1px solid#bfc2c6"};
`;

const CheckboxWrapper = styled.div`
  margin-left: 24px;
`;
const SizeCheckboxLabel = styled.label`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-left: 8px;
  margin-right: 36px;
  margin-bottom: 25px;
  text-transform: uppercase;
  justify-content: space-around;
  font-size: 0.88rem;
  &:hover {
    color: grey;
  }
`;
const SizeCheckboxInput = styled.input`
  width: 46px;
  height: 32px;
  border-radius: 13%;
  background-color: transparent;
  border: 2px solid rgb(191 194 198);
  appearance: none;
  outline: none;
  position: absolute;
  cursor: pointer;
  &:checked {
    border-width: 0.125rem;
    border-color: black;
  }
`;
