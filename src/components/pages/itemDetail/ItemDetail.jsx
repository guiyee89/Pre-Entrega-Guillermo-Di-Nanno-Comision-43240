import styled from "styled-components/macro";
import { ItemCount } from "../../common/itemCount/ItemCount";

export const ItemDetail = ({ selectedItem, onAdd }) => {
  const hasDiscount = "discount" in selectedItem;

  return (
    <Wrapper>
      <ImgWrapper>
        <Image src={selectedItem.img} id={selectedItem.id} />
      </ImgWrapper>
      {console.log(selectedItem)}
      <InsideWrapper>
        <Title>{selectedItem.title}</Title>
        <SubTitle>{selectedItem.subtitle}</SubTitle>
        <Description>{selectedItem.description}</Description>
        {hasDiscount ? (
          <ItemPrice hasDiscount={hasDiscount}>
            <DiscountPrice>$ {selectedItem.discountPrice} </DiscountPrice> ${" "}
            {selectedItem.price}
          </ItemPrice>
        ) : (
          <ItemPrice>$ {selectedItem.price}</ItemPrice>
        )}
        <Stock>
          in stock <Num>{selectedItem.stock}</Num>
        </Stock>
        <ItemCount stock={selectedItem.stock} initial={1} onAdd={onAdd} />
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
  height: 60%;
  width: 470px;
  -webkit-box-pack: justify;
  justify-content: space-around;
  line-height: 1.3;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: -2px;
  margin-bottom: -14px;
`;
const SubTitle = styled.h2`
  font-size: 1.3rem;
  padding: 0px 0 24px 0;
`;
const Description = styled.p`
  font-size: 0.9rem;
  margin-top: -24px;
  line-height: 1.5;
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
`;

const Stock = styled.p`
  font-size: 0.85rem;
  font-style: italic;
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
