import styled from "styled-components/macro";
import { ItemCount } from "../../common/itemCount/ItemCount";
import { FilterColorSize } from "./FilterColorSize";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export const ItemDetail = ({ selectedItem }) => {
  const [filteredItem, setFilteredItem] = useState({}); //Filtered Item from FilterColorSize component

  const { addToCart } = useContext(CartContext); //Function addToCart from Context

  const hasDiscount = "discount" in selectedItem; //Get discounted item

  console.log(filteredItem);

  const handleFilterItemChange = (item) => {
    //handle function to create the filter logic in FilterColorSize Component
    setFilteredItem(item);
  };

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

  return (
    <Wrapper>
      {(selectedItem.id || filteredItem.id) && (
        <>
          <ImgWrapper>
            <Image
              src={selectedItem.id ? selectedItem.img : filteredItem.img}
              id={selectedItem.id || filteredItem.id}
            />
          </ImgWrapper>
          <InsideWrapper>
            <Title>
              {selectedItem.id ? selectedItem.title : filteredItem.title}
            </Title>
            <SubTitle>
              {selectedItem.id ? selectedItem.subtitle : filteredItem.subtitle}
            </SubTitle>
            <ColorText>
              Color: <ColorSpan>{selectedItem.id ? selectedItem.color : filteredItem.color}</ColorSpan>
            </ColorText>
            <FilterWrapper>
              <FilterColorSize
                selectedItem={selectedItem} //pass the selectedItem to filter
                onFilterItemChange={handleFilterItemChange} //handle function
              />
            </FilterWrapper>
            <Stock>
              in stock{" "}
              <Num>
                {selectedItem.id ? selectedItem.stock : filteredItem.stock}
              </Num>
            </Stock>
            {selectedItem.id || filteredItem.id ? (
              <>
                {hasDiscount ? (
                  <ItemPrice hasDiscount={hasDiscount}>
                    <DiscountPrice>
                      $
                      {selectedItem.id
                        ? selectedItem.discountPrice
                        : filteredItem.discountPrice}
                    </DiscountPrice>{" "}
                    ${selectedItem.id ? selectedItem.price : filteredItem.price}
                  </ItemPrice>
                ) : (
                  <ItemPrice>
                    ${selectedItem.id ? selectedItem.price : filteredItem.price}
                  </ItemPrice>
                )}
                <ItemCountWrapper>
                  <ItemCount
                    stock={
                      selectedItem.id ? selectedItem.stock : filteredItem.stock
                    }
                    initial={1}
                    onAddToCart={onAddToCart} // Pass the onAddToCart function to ItemCount
                  />
                </ItemCountWrapper>
                <Description>
                  {selectedItem.id
                    ? selectedItem.description
                    : filteredItem.description}
                </Description>
                <ReferenceWrapper>
                  <SizeReference>Reference Size Model</SizeReference>
                </ReferenceWrapper>
              </>
            ) : (
              <p>No item selected.</p>
            )}
          </InsideWrapper>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: flex-end;
  height: 700px;
  max-width: 1300px;
  margin: 0 auto;
  padding-left: 65px;
`;
const InsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 520px;
  padding-left: 50px;
  gap: 1.4rem;
  -webkit-box-pack: justify;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: -2px;
  margin-bottom: -14px;
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
`
const FilterWrapper = styled.div`
  height: 150px;
  width: 80px;
  display: flex;
  align-items: center;
`;

const DiscountPrice = styled.span`
  color: #a83737;
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 6px 0 8px 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 16px;
    width: 100%;
    left: 67px;
    border-top: 0.1rem solid rgb(75, 73, 73);
  }
`;
const ItemPrice = styled.h4`
  color: ${(props) => (props.hasDiscount ? "rgb(149 146 146)" : "#a83737")};
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 6px 0 8px 0;
  text-align: center;
`;

const Stock = styled.p`
  font-size: 0.85rem;
  font-style: italic;
  text-align: center;
`;
const Num = styled.span`
  color: #c92b2b;
  font-weight: bold;
  font-size: 1.1rem;
`;
const ImgWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 1.3px;
`;
const ItemCountWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Description = styled.p`
  font-size: 0.9rem;
  margin-top: -24px;
  line-height: 1.5;
`;
const ReferenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SizeReference = styled.p`
  text-transform: uppercase;
`;
