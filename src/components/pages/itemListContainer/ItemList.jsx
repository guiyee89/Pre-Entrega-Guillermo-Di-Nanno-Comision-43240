import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styled from "styled-components/macro";

export const ItemList = ({ items }) => {
  console.log(items);

  return (
    <Wrapper>
      {items.map((item) => {
        return (
          <ItemCard style={{ width: "18rem" }} key={item.id}>
            <ItemImg variant="top" src={item.img} />
            <ItemDetails>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemText>{item.description}</ItemText>
              <Button variant="primary">Show Details</Button>
            </ItemDetails>
          </ItemCard>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1240px;
  padding: 24px 0px;
  margin: 0px auto;
  gap: 16px;
  -webkit-box-pack: center;
  justify-content: space-evenly;
`;
const ItemCard = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.75) 0px 2px 8px;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  height: 350px;
  justify-content: space-evenly;
  align-items: center;
`;
const ItemImg = styled(Card.Img)`
  height: 140px;
  max-width: fit-content;
  margin: 0 auto;
`;
const ItemDetails = styled(Card.Body)`
  padding: 0px 24px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const ItemTitle = styled(Card.Title)`
  font-weight: bold;
  font-size: 1.5rem;
`;
const ItemText = styled(Card.Text)`
  padding: 16px 0 16px 0;
`;
