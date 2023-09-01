import styled from "styled-components/macro";
import { ItemCount } from "../../../common/itemCount/ItemCount";
import { FilterDetail } from "../filterDetails/FilterDetail";
import { useState, useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { ClipLoader } from "react-spinners";
import { ItemImageMobile } from "./ItemImageMobile";

export const ItemDetailMobile = ({ selectedItem }) => {
  ///////////////////////////////////////////////////////////////////////////////////
  const [filteredItem, setFilteredItem] = useState({}); //Filtered Item from FilterColorSize component
  const { addToCart } = useContext(CartContext); //Function addToCart from Context
  const hasDiscount = "discount" in selectedItem; //Get discounted item

  ///////////////////////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////////
  //       FILTERING OF COLOR AND SIZE & HANDLING IMAGE CHANGE + Loaders        //

  //  handle filtering size & color  //
  const handleFilterItemChange = (item) => {
    if (item === undefined) {
      //Check in case "item" doesn't exist, then return the original selected item
      setFilteredItem(selectedItem);
    } else {
      //else return the filtered item
      setFilteredItem(item);
    }
  };

  // Loader for Size filter
  const [loadingSize, setLoadingSize] = useState(false);

  const handleSizeLoading = () => {
    setLoadingSize(true);
    setTimeout(() => {
      setLoadingSize(false);
    }, 700);
  };

  //------      HANDLE IMAGES FOR RENDERING       -------//
  const [selectedImage, setSelectedImage] = useState({});

  const handleImageChange = (image, index) => {
    setSelectedImage(image, index);
  };

  ///////////////////////////////////////////////////////////////////////////////////
  /* Render item details based on the existence of selectedItem or filteredItem */
  return (
    <Wrapper>
      {/* Check if either selectedItem or filteredItem exists */}
      {selectedItem?.id || Object.keys(filteredItem).length > 0 ? (
        <>
          {hasDiscount && <Discount>-{selectedItem.discount}%</Discount>}

          <Title>
            {Object.keys(filteredItem).length > 0
              ? filteredItem.title
              : selectedItem.title}
          </Title>
          <ItemImageMobile
            filteredItem={filteredItem}
            selectedItem={selectedItem}
            handleImageChange={handleImageChange}
          />
          <InsideWrapper>
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
              <FilterDetail
                selectedItem={selectedItem}
                onFilterItemChange={handleFilterItemChange}
                handleSizeLoading={handleSizeLoading}
              />
            </FilterWrapper>

            <StockPriceWrapper>
              {hasDiscount ? (
                <ItemPriceWrapper>
                  <Price>
                    ${" "}
                    {Object.keys(filteredItem).length > 0
                      ? filteredItem.discountPrice.toFixed(2)
                      : selectedItem.discountPrice.toFixed(2)}
                  </Price>{" "}
                  <DiscountPrice hasDiscount={hasDiscount}>
                    ${" "}
                    {Object.keys(filteredItem).length > 0
                      ? filteredItem.price.toFixed(2)
                      : selectedItem.price.toFixed(2)}
                  </DiscountPrice>
                </ItemPriceWrapper>
              ) : (
                <Price>
                  ${" "}
                  {Object.keys(filteredItem).length > 0
                    ? filteredItem.price.toFixed(2)
                    : selectedItem.price.toFixed(2)}
                </Price>
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
              {loadingSize ? ( // Render the ClipLoader and disable the ItemCount for 1 second when filtering
                <Loader>
                  <ClipLoader color="#194f44" size={50} />
                </Loader>
              ) : (
                <ItemCount
                  stock={
                    Object.keys(filteredItem).length > 0
                      ? filteredItem.stock
                      : selectedItem.stock
                  }
                  initial={1}
                  onAddToCart={onAddToCart}
                  disabled={loadingSize}
                />
              )}
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
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 85%;
  margin-bottom: 30px;
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const Discount = styled.h4`
  position: absolute;
  display: flex;
  top: 95px;
  right: 69.6%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(179, 70, 70);
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 2.8;
  z-index: 1;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    right: 81.6%;
  }
  @media (max-width: 450px) {
    width: 50px;
    height: 50px;
    font-size: 1rem;
    line-height: 1.2;
  }
`;
const InsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 68%;
  gap: 1rem;
  margin-left: 12px;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: -2px;
  margin: 0px -8px 15px 0px;
`;
const SubTitle = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-left: 105px;
  @media (max-width: 550px) {
    margin-left: 0;
    text-align: inherit;
  }
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
  color: ${(props) => (props.hasDiscount ? "#6c757d;" : "#a83737")};
  font-weight: 600;
  font-size: 1.13rem;
  font-style: italic;
  padding: 6px 0 8px 0;
  position: relative;
  &::after {
    content: ${(props) => (props.hasDiscount ? "''" : "none")};
    position: absolute;
    bottom: 50%;
    left: -2%;
    width: 103%;
    border-top: 0.13rem solid rgb(84 81 81);
  }
`;
const Price = styled.span`
  color: #a83737;
  font-weight: 600;
  font-size: 1.4rem;
  font-style: italic;
  position: relative;
`;
const ItemPriceWrapper = styled.h4`
  display: flex;
  align-items: center;
  width: fit-content;
  flex-direction: column-reverse;
  justify-content: space-around;
`;
const StockPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  padding: 8px 11px;
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
  position: relative;
  margin: 0 0;
  margin: 4px 0px 15px;
`;
const Loader = styled.div`
  height: 70px;
  display: flex;
  width: 177px;
  align-content: center;
  justify-content: flex-end;
`;
const Description = styled.p`
  font-size: 0.9rem;
  margin-top: -24px;
  line-height: 1.5;
  padding-right: 30px;
`;
const ReferenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SizeReference = styled.p`
  text-transform: uppercase;
`;
