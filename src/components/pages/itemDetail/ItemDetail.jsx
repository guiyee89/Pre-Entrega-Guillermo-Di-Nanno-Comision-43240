import styled from "styled-components/macro";
import { ItemCount } from "../../common/itemCount/ItemCount";

export const ItemDetail = ({ selectedItem, onAdd }) => {
  return (
    <Wrapper>
      <ImgWrapper>
        <Image src={selectedItem.img} id={selectedItem.id} />
      </ImgWrapper>

      <InsideWrapper>
        <Title>{selectedItem.title}</Title>
        <SubTitle>{selectedItem.subtitle}</SubTitle>
        <Description>{selectedItem.description}</Description>
        <Price>
          <Span>$</Span>
          {selectedItem.price}
        </Price>
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
const Price = styled.h3`
  color: #c92b2b;
  font-weight: bold;
  font-size: 1.1rem;
`;
const Span = styled.span`
  color: black;
  padding-right: 4px;
  font-weight: bold;
  font-size: 1.1rem;
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
  height: 500px;
  width: 38%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 95%;
  width: 100%;
  object-fit: contain;

  //Cambio height para que no se distorcione la imagen
  /* height: ${({ id }) =>
    id === 1
      ? "365px"
      : id === 2
      ? "340px"
      : id === 5
      ? "388px"
      : id === 6
      ? "311px"
      : id === 3
      ? "365px"
      : "90%"}; */
`;
