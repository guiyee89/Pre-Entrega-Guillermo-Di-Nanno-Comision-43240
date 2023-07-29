import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const FilterColorSize = ({ selectedItem, onFilterItemChange  }) => {

  const [selectedFilters, setSelectedFilters] = useState({
    color: null,
    size: null,
  });

  const [relatedItems, setRelatedItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState({});
  
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
        setRelatedItems(relatedItems);//save the related items of the selectedItem
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


  // Function to handle size filter selection change
  const handleSizeChange = (size) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      size: size,
    }));
  };
  // Function to handle color filter selection change
  const handleColorChange = (color) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      color: color,
    }));
  };


  // Function to handle size and color filter selection change
  useEffect(() => {
    const { color, size } = selectedFilters;
    if (color && size) {
      const filteredItem = relatedItems.find(
        (item) => item.color === color && item.size === size
      );
      setFilteredItem(filteredItem || {});
      onFilterItemChange(filteredItem); // Call the onFilterItemChange function with the filtered item
    } else {
      setFilteredItem({});
      onFilterItemChange({}); // Call the onFilterItemChange function with an empty object
    }
  }, [selectedFilters, relatedItems, onFilterItemChange]);


  //Create map for properties "color" and "size" in the items objects to render
  const uniqueColors = Array.from(
    new Set(relatedItems.map((item) => item.color))
  );
  const uniqueSizes = Array.from(
    new Set(relatedItems.map((item) => item.size))
  );

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
                  <ColorImage
                    src={itemsWithCurrentColor[0].img}
                    alt={color}
                  />
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
          {uniqueSizes.map((size) => (
            <SizeCheckboxWrapper key={size}>
              <SizeCheckbox
                id={`size-${size}`}
                checked={selectedFilters.size === size}
                onChange={() => handleSizeChange(size)}
              />
              <SizeCheckboxLabel htmlFor={`size-${size}`}>
                {size}
              </SizeCheckboxLabel>
            </SizeCheckboxWrapper>
          ))}
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

const ColorCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const ColorCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
  }
`;
const ColorRepresentation = styled.div``;
const ColorImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
`;

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
  }
`;

const SizeCheckboxLabel = styled.label`
  cursor: pointer;
  position: absolute;
  top: 9px;
  left: 10px;
  text-transform: uppercase;
  font-weight: bold;
  &:active {
    color: white;
  }
`;
