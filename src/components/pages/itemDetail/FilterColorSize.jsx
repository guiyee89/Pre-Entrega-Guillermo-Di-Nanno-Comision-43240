import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components/macro";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const FilterColorSize = ({ selectedItem }) => {
  const [filterColor, setFilterColor] = useState({});
  const [filterSize, setFilterSize] = useState({
    xs: false,
    s: false,
    m: false,
    l: false,
    xl: false,
  });

  const [relatedItems, setRelatedItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState({});

  console.log(relatedItems);
  console.log(filteredItem);
  //ENCONTRAMOS PRODUCTO POR "ID" Y BUSCAMOS MAS ITEMS QUE COINCIDAN EN "USERID" PARA RENDERIZAR
  useEffect(() => {
    // Fetch related items by userId
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
        setRelatedItems(relatedItems);
      })
      .catch((error) => {
        console.error("Error fetching related items:", error);
      });
  }, [selectedItem]);

  // Function to handle size filter selection change
  const handleSizeChange = (size) => {
    setFilterSize((prevFilterSize) => ({
      ...prevFilterSize,
      xs: false,
      s: false,
      m: false,
      l: false,
      xl: false,
      [size]: true, // Set the selected size to true
    }));
    // Filter related items based on the selected size
    const filteredItemsBySize = relatedItems.filter(
      (item) => item.size === size
    );
      // Update the filteredItem state with the filtered items
      setFilteredItem(filteredItemsBySize);
    
  };

  const handleColorChange = (color) => {
    setFilterColor((prevFilterColor) => {
      // Create a new object with all colors set to false
      const newFilterColor = {};
      Object.keys(prevFilterColor).forEach((prevColor) => {
        newFilterColor[prevColor] = false;
      });
      // Set the selected color to true
      newFilterColor[color] = true;
      return newFilterColor;
    });
    // Filter related items based on the selected color
    const filteredItemsByColor = relatedItems.filter(
      (item) => item.color === color
    );
    // Update the filteredItem state with the filtered items
    setFilteredItem(filteredItemsByColor);
  };

  

  const uniqueColors = Array.from(
    new Set(relatedItems.map((item) => item.color))
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
                    checked={filterColor[color] || false}
                    onChange={() => handleColorChange(color)}
                  />
                  <ColorImage
                    src={itemsWithCurrentColor[0].img} // Use the image from the first related item with the current color
                    alt={color}
                  />
                </ColorCheckboxWrapper>
              );
            } else {
              return (
                <ColorCheckboxWrapper key={color}>
                  <ColorCheckbox
                    id={`color-${color}`}
                    checked={filterColor[color] || false}
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
          {Object.keys(filterSize).map((size) => (
            <SizeCheckboxWrapper key={size}>
              <SizeCheckbox
                id={`size-${size}`}
                checked={filterSize[size] || false}
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
