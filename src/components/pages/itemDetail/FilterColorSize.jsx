import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const FilterColorSize = ({ selectedItem, onFilterItemChange }) => {
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

const SizeCheckboxLabel = styled.label`
  cursor: pointer;
  position: absolute;
  top: 46%;
  left: 42%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-weight: bold;
  transition: color 0.2s; /* Optional: Add a smooth transition for the color change */
  &:active {
    color: white;
  }
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
  &:checked + ${SizeCheckboxLabel} {
    color: white;
  }
`;
