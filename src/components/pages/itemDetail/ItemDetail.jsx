import styled from "styled-components/macro";
import { ItemCount } from "../../common/itemCount/ItemCount";
import { FilterColorSize } from "./FilterColorSize";

export const ItemDetail = ({ selectedItem, onAdd }) => {

  const hasDiscount = "discount" in selectedItem;

  // const filterRelatedItems = () => {
  //   const relatedItemMap = new Map();
  
  //   relatedItems.forEach((item) => {
  //     const { userId, color } = item;
  //     const key = `${userId}-${color}`;
  
  //     // Check if the item's userId and color combination already exists in the relatedItemMap
  //     if (!relatedItemMap.has(key)) {
  //       // If not, add the item to the relatedItemMap
  //       relatedItemMap.set(key, item);
  //     }
  //   });
  //   // Convert the Map values to an array of filtered related items
  //   return Array.from(relatedItemMap.values());
  // };
  

  return (
    <Wrapper>
      <ImgWrapper>
        <Image src={selectedItem.img} id={selectedItem.id} />
      </ImgWrapper>
      <InsideWrapper>
        <Title>{selectedItem.title}</Title>
        <SubTitle>{selectedItem.subtitle}</SubTitle>
        {/* FILTER COMPONENT */}
        <FilterWrapper>
          <FilterColorSize  selectedItem={selectedItem} />
        </FilterWrapper>
        <Stock>
          in stock <Num>{selectedItem.stock}</Num>
        </Stock>
        {hasDiscount ? (
          <ItemPrice hasDiscount={hasDiscount}>
            <DiscountPrice>$ {selectedItem.discountPrice} </DiscountPrice> ${" "}
            {selectedItem.price}
          </ItemPrice>
        ) : (
          <ItemPrice>$ {selectedItem.price}</ItemPrice>
        )}
        <ItemCountWrapper>
          <ItemCount stock={selectedItem.stock} initial={1} onAdd={onAdd} />
        </ItemCountWrapper>
        <Description>{selectedItem.description}</Description>
        <ReferenceWrapper>
          <SizeReference>Reference Size Model</SizeReference>
        </ReferenceWrapper>
      </InsideWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: space-evenly;
  height: 700px;
  max-width: 1300px;
  margin: 0 auto;
`;
const InsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 470px;
  -webkit-box-pack: justify;
  justify-content: space-evenly;
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
  padding: 0px 0 24px 0;
  text-align: center;
`;
// const Span = styled.span`
//   padding-left:15px ;
//   font-size: 1rem;
//   font-weight: bold;
// `
const FilterWrapper = styled.div`
height: 100px;
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
  /* height: 500px; */
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  /* height: 95%; */
  width: 100%;
  object-fit: contain;
`;
const ItemCountWrapper = styled.div`
  display: flex;
  justify-content: center;
`
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
