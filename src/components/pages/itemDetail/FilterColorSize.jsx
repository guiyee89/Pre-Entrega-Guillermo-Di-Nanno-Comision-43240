import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";



export const FilterColorSize = ({ selectedItem, onFilterItemChange }) => {

//////////////     //////////////    ////////////      ////////////      /////////////
  const [selectedFilters, setSelectedFilters] = useState({
    //set selectedFilters with color and size values
    color: null,
    size: null,
  });
  const [relatedItems, setRelatedItems] = useState([]); //Items related to the selectedItem prop
  const [filteredItem, setFilteredItem] = useState({}); //Item filtered



//////////////     //////////////    ////////////      ////////////      /////////////
//           FETCH ITEMS RELATED TO "selectedItem" BY userId PROPERTY              //           (Firestore database)

  useEffect(() => {
    // Fetch related items of selectedItem by userId to get all products
    const userId = selectedItem.userId;
    const relatedItemsQuery = query(
      collection(db, "products"),
      where("userId", "==", userId)
    );
    getDocs(relatedItemsQuery)
      .then((snapshot) => {
        const relatedItems = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRelatedItems(relatedItems); //save the related items of the selectedItem
      })
      .catch((error) => {
        console.error("Error fetching related items:", error);
      });
    // Set the color and size checkboxes according to the selectedItem at first rendering
    setSelectedFilters({
      color: selectedItem.color,
      size: selectedItem.size,
    });
  }, [selectedItem]);



//////////////     //////////////    ////////////      ////////////      /////////////
//              HANDLING OF COLOR AND SIZE SELECTION ON-CHANGE                      //

  // Function to handle color filter selection change
  const handleColorChange = (color) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      color: color,
    }));
  };
  // Function to handle size filter selection change
  const handleSizeChange = (size) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      size: size,
    }));
  };

  // Function to handle size and color filter selection change
  useEffect(() => {
    const { color, size } = selectedFilters;
    if (color && size) {
      let filterSelection = relatedItems.find(
        (item) => item.color === color && item.size === size
      );
      if (!filterSelection) {
        // If no item matches the selected combination of color and size, find the first item that has color and size properties
        filterSelection = relatedItems.find(
          (item) => item.color === color && item.size
        );
        // Set an available selectedFilters "size" when selecting a new "color" in case filteredItem doesn't have current "size"
        if (filterSelection) {
          filterSelection = relatedItems.find((item) => item.color === color);
          setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            size: filterSelection.size,
          }));
        }
      }
      setFilteredItem(filterSelection || {});
      onFilterItemChange(filterSelection); //responible to set new item by color or sizes and render it
    }
  }, [selectedFilters, relatedItems, onFilterItemChange]);



//////////////     //////////////    ////////////      ////////////      //////////////
//                      LOGIC FOR COLOR & SIZE RENDERING                           //

  //Create map for properties existing "color" 
  const uniqueColors = Array.from(
    new Set(relatedItems.map((item) => item.color))
  );

  //Render custom "size" for clothing or map existing "size" for shoes
  const renderSizes = () => {
    const customSizes = ["xs", "s", "m", "l", "xl"];
    const uniqueSizesShoes = Array.from(
      new Set(relatedItems.map((item) => item.size))
    );
  
    return selectedItem.category === "shoes"
      ? uniqueSizesShoes
          .map((size) => parseInt(size, 10))
          .sort((a, b) => a - b)
          .map((sizeNumber) => sizeNumber.toString())
      : customSizes;
  };

  //Manipulate "size" enabling/disabling by selecting a "color" checking which sizes are available
  const getAvailableSizesForColor = (color) => {
    return Array.from(
      new Set(
        relatedItems
          .filter((item) => item.color === color)
          .map((item) => item.size)
      )
    );
  };
  // ... (other handlers)
  const availableSizesForColor = selectedFilters.color
    ? getAvailableSizesForColor(selectedFilters.color)
    : [];



  //  RENDERING  //
  return (
    <>
      <Wrapper>
        {/* Color filter */}
        <ColorContainer>
          {uniqueColors.map((color) => {
            const itemsWithCurrentColor = relatedItems.filter(
              (item) => item.color === color
            );
            if (itemsWithCurrentColor.length > 0) {
              return (
                <ColorCheckboxWrapper key={color}>
                  <ColorCheckbox
                    id={`color-${color}`}
                    checked={selectedFilters.color === color}
                    onChange={() => handleColorChange(color)}
                  />
                  <ColorImage src={itemsWithCurrentColor[0].img} alt={color} />
                </ColorCheckboxWrapper>
              );
            } else {
              return (
                <ColorCheckboxWrapper key={color}>
                  <ColorCheckbox
                    id={`color-${color}`}
                    checked={selectedFilters.color === color}
                    onChange={() => handleColorChange(color)}
                  />
                  {/* Placeholder representation when there are no related items with the current color */}
                  <ColorRepresentation color={color} />
                </ColorCheckboxWrapper>
              );
            }
          })}
        </ColorContainer>

        {/* Size filter */}
        <SizeContainer>
          {renderSizes().map((size) => {
            const isSizeAvailable =
              !selectedFilters.color || availableSizesForColor.includes(size);
            return (
              <SizeCheckboxWrapper key={size}>
                <SizeCheckbox
                  id={`size-${size}`}
                  checked={selectedFilters.size === size}
                  onChange={() => handleSizeChange(size)}
                  disabled={!isSizeAvailable}
                />
                <SizeCheckboxLabel
                  htmlFor={`size-${size}`}
                  checked={SizeCheckboxLabel && "white"}
                  isSizeAvailable={isSizeAvailable}
                >
                  {size}
                </SizeCheckboxLabel>
              </SizeCheckboxWrapper>
            );
          })}
        </SizeContainer>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ColorCheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: -5px;
`;

const ColorCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
  appearance: none;
  width: 76px;
  height: 80px;
  outline: none;
  cursor: pointer;
  &:checked {
    border: 2px rgb(21, 26, 32) solid;
    border-radius: 12px;
  }
`;
const ColorImage = styled.img`
  width: 72px;
  height: 76px;
  object-fit: cover;
  position: absolute;
  right: 10px;
  top: 2.5px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 3.5px;
`;
const ColorRepresentation = styled.div``;

const SizeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SizeCheckboxWrapper = styled.div`
  margin-right: 8px;
  position: relative;
`;

const SizeCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
  appearance: none;
  width: 36px;
  height: 41px;
  border: 2px solid rgb(204, 204, 204);
  border-radius: 40%;
  outline: none;
  cursor: pointer;
  &:checked {
    background-color: #b55604;
    border: 2px solid rgb(181, 86, 4);
  }
`;
const SizeCheckboxLabel = styled.label`
  cursor: pointer;
  position: absolute;
  top: 46%;
  left: 42%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-weight: bold;
  transition: color 0.1s;
  color: black;

  /* Style for the unchecked state */
  color: ${(props) => !props.isSizeAvailable && "lightgray"};
  /* Style for the checked state */
  ${SizeCheckbox}:checked + & {
    color: white;
  }
`;
