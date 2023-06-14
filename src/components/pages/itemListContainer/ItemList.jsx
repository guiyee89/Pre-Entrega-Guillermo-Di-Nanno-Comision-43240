import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const ItemList = ({ items }) => {
  console.log(items);

  const [shuffledItems, setShuffledItems] = useState([]);

  //Algoritmo de Fisher-Yates para renderizar los productos de manera aleatoria
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    };

    setShuffledItems(shuffleArray(items));
  }, [items]);

  return (
    <Wrapper>
      {shuffledItems.map((item) => {
        return (
          <ItemCard style={{ width: "18rem" }} key={item.id}>
            <ItemImg variant="top" src={item.img} />
            <ItemDetails>
              <ItemTitle>{item.name}</ItemTitle>
              <ItemText>{item.description}</ItemText>
              <Link to={`/item-details/${item.id}`}>
                <Button variant="primary">Show Details</Button>
              </Link>
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
  box-shadow: rgba(0, 0, 0, 0.75) 0px -4px 8px;
  background-color: #e2e1e1;
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
