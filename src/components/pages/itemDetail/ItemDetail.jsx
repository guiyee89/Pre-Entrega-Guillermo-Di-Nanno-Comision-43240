import styled from "styled-components/macro";
import { ItemCount } from "../../common/itemCount/ItemCount";

export const ItemDetail = ({ selectedItem }) => {
  const onAdd = (quantity) => {
    let data = {
      ...selectedItem,
      count: quantity,
    };
    console.log(data);
  };

  return (
    <Wrapper>
      <ImgWrapper>
        <Image src={selectedItem.img} id={selectedItem.id} />
      </ImgWrapper>

      <InsideWrapper>
        <Title>{selectedItem.name}</Title>
        <Text>{selectedItem.description}</Text>
        <Stock>in stock <Num>{selectedItem.stock}</Num></Stock>
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
  justify-content: center;
  height: 700px;
  gap: 4rem;
`;
const InsideWrapper = styled.div`
  margin: 0 80px;
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 3rem;
`;
const Text = styled.p`
  font-size: 1rem;
  width: 250px;
  margin-top: -15px;
`;
const Stock = styled.p`
  font-size: .85rem;
  font-style: italic;
`;
const Num = styled.span`
  color: #c92b2b;
  font-weight: bold;
  font-size: 1rem;
`
const ImgWrapper = styled.div`
  height: 460px;
  width: 450px;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 80%;
  //Cambio height para que no se distorcione la imagen
  height: ${({ id }) =>
    id === 1 ? "365px" :
    id === 2 ? "340px" :
    id === 5 ? "388px" :
    id === 6 ? "311px" :
    id === 3 ? "365px" : "90%"
  };
`;