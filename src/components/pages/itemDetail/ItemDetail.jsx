import styled from "styled-components/macro";
import { ItemCount } from "../../common/itemCount/ItemCount";
import { Filters } from "./Filters";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { MultiImages } from "./MultiImages";

export const ItemDetail = ({ selectedItem }) => {
  const [filteredItem, setFilteredItem] = useState({}); //Filtered Item from FilterColorSize component
  const { addToCart } = useContext(CartContext); //Function addToCart from Context
  const hasDiscount = "discount" in selectedItem; //Get discounted item

  //On add to cart if selectedItem or filteredItem
  const onAddToCart = (quantity) => {
    let data = {
      ...selectedItem,
      quantity: quantity,
    };
    if (filteredItem && Object.keys(filteredItem).length > 0) {
      data = {
        ...filteredItem,
        quantity: quantity,
      };
    }
    addToCart(data);
    setFilteredItem({}); // Reset the filteredItem state after adding to cart
  };

  const handleFilterItemChange = (item) => {
    if (item === undefined) {
      //Check in case "item" doesn't exist, then return the original selected item
      setFilteredItem(selectedItem);
    } else {
      //else return the filtered item
      setFilteredItem(item);
    }
  };

  const [selectedImage, setSelectedImage] = useState({});

  const handleImageChange = (image, index) => {
    setSelectedImage(image, index);
  };

  console.log(selectedImage);


  
  return (
     /* Render item details based on the existence of selectedItem or filteredItem */

    <Wrapper>
      {/* Check if either selectedItem or filteredItem exists */}
      {selectedItem?.id || Object.keys(filteredItem).length > 0 ? (
        <>

         {/* Rendering Images */}
          <MultiImages
            filteredItem={filteredItem}
            selectedItem={selectedItem}
            handleImageChange={handleImageChange}
          />

          <InsideWrapper>
            <Title>
              {Object.keys(filteredItem).length > 0
                ? filteredItem.title
                : selectedItem.title}
            </Title>

            <SubTitle>
              {Object.keys(filteredItem).length > 0
                ? filteredItem.subtitle
                : selectedItem.subtitle}
            </SubTitle>

            <ColorText>
              Color:{" "}
              <ColorSpan>
                {Object.keys(filteredItem).length > 0
                  ? filteredItem.color
                  : selectedItem.color}
              </ColorSpan>
            </ColorText>

            <FilterWrapper>
              <Filters
                selectedItem={selectedItem}
                onFilterItemChange={handleFilterItemChange}
              />
            </FilterWrapper>

            <StockPriceWrapper>
              {hasDiscount ? (
                <ItemPrice hasDiscount={hasDiscount}>
                  <DiscountPrice>
                    $
                    {Object.keys(filteredItem).length > 0
                      ? filteredItem.discountPrice
                      : selectedItem.discountPrice}
                  </DiscountPrice>{" "}
                  $
                  {Object.keys(filteredItem).length > 0
                    ? filteredItem.price
                    : selectedItem.price}
                </ItemPrice>
              ) : (
                <ItemPrice>
                  $
                  {Object.keys(filteredItem).length > 0
                    ? filteredItem.price
                    : selectedItem.price}
                </ItemPrice>
              )}
              <Stock>
                Available Stock{" "}
                <Num>
                  {Object.keys(filteredItem).length > 0
                    ? filteredItem.stock
                    : selectedItem.stock}
                </Num>
              </Stock>
            </StockPriceWrapper>

            <ItemCountWrapper>
              <ItemCount
                stock={
                  Object.keys(filteredItem).length > 0
                    ? filteredItem.stock
                    : selectedItem.stock
                }
                initial={1}
                onAddToCart={onAddToCart}
              />
            </ItemCountWrapper>

            <Description>
              {Object.keys(filteredItem).length > 0
                ? filteredItem.description
                : selectedItem.description}
            </Description>

            <ReferenceWrapper>
              <SizeReference>Reference Size Model</SizeReference>
            </ReferenceWrapper>
          </InsideWrapper>
        </>
      ) : (
        // Render a loading state or a message while the data is being loaded
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: flex-end;
  height: 700px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-left: 65px;
`;
const InsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  width: 545px;
  gap: 1.4rem;
  -webkit-box-pack: justify;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: -2px;
  margin-bottom: -27px;
  text-align: center;
`;
const SubTitle = styled.h2`
  font-size: 1.3rem;
  text-align: center;
`;
const ColorText = styled.p`
  text-transform: capitalize;
  font-weight: 500;
`;
const ColorSpan = styled.span`
  font-weight: bold;
`;
const FilterWrapper = styled.div`
  height: 150px;
  width: 95%;
  display: flex;
  align-items: center;
`;

const DiscountPrice = styled.span`
  color: #a83737;
  font-weight: 600;
  font-size: 1.2rem;
  font-style: italic;
  padding: 6px 0 8px 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 18px;
    width: 102%;
    left: 75px;
    border-top: 0.15rem solid rgb(75, 73, 73);
  }
`;
const StockPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  padding: 8px 0;
  margin-left: 9px;
`;
const ItemPrice = styled.h4`
  color: ${(props) => (props.hasDiscount ? "rgb(149 146 146)" : "#a83737")};
  font-weight: 600;
  font-size: 1.2rem;
  font-style: italic;
`;

const Stock = styled.p`
  font-size: 0.85rem;
  font-style: italic;
  padding-left: 60px;
`;
const Num = styled.span`
  color: #c92b2b;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ItemCountWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Description = styled.p`
  font-size: 0.9rem;
  margin-top: -24px;
  line-height: 1.5;
  padding-right: 25px;
`;
const ReferenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SizeReference = styled.p`
  text-transform: uppercase;
`;
