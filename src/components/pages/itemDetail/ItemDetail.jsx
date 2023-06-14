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
      <Image src={selectedItem.img} />
      <InsideWrapper>
        <Title>{selectedItem.name}</Title>
        <Text>{selectedItem.description}</Text>
        <ItemCount stock={selectedItem.stock} initial={1} onAdd={onAdd} />
      </InsideWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 700px;
  /* margin: 0 auto; */
`;
const InsideWrapper = styled.div`
  margin: 32px;
  display: flex;
  flex-direction: column;
  height: 50%;
  justify-content: space-evenly;
`;
const Title = styled.h1`
  font-size: 2rem;
`;
const Text = styled.p`
  font-size: 1rem;
  width: 240px;
`;
const Image = styled.img`
  width: 400px;
`;
