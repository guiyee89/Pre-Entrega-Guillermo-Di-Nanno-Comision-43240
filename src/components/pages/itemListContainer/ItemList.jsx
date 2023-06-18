import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { BsBagPlusFill, BsEyeFill } from "react-icons/bs";

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
      {/* Mapeo de productos */}
      {shuffledItems.map((item) => {
        return (
          <ItemCard style={{ width: "288px" }} key={item.id}>
            {/* Imagen */}
            <ImgWrapper to={`/item-details/${item.id}`}>
              <ItemImg variant="top" src={item.img} />
            </ImgWrapper>

            {/* Buttons */}
            <ButtonsWrapper>
              <BtnAddCart>
                <AddCart />
              </BtnAddCart>

              <BtnSeeDetails to={`/item-details/${item.id}`}>
                <SeeDetails />
              </BtnSeeDetails>
            </ButtonsWrapper>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemPrice>${item.price}</ItemPrice>
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

//Buttons Container (se inicializa hover de buttons con ItemCard)
const ButtonsWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  background-color: #873c3c;
  width: 40px;
  height: 40px;
  opacity: 0;
  transform: translateX(20px);
`;
// CARD DE PRODUCTOS 
const ItemCard = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  height: 325px;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 24px;
  justify-content: center;
  position: relative;
  max-width: 250px;
  &:hover ${ButtonsWrapper} {
    opacity: 1;
    transform: translateX(-20px);
    transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
  }
`;
//Image (Se inicializa hover con ImgWrapper)
const ItemImg = styled.img`
  max-width: 100%;
  max-height: 70%;
  margin: 0 auto;
  overflow: hidden;
  transition: transform 0.19s ease-in-out 0.08s;
  cursor: pointer;
`;
//Image Wrappers
const ImgWrapper = styled(Link)`
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px;
  background-color: #eeeeee;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  overflow: hidden;
  cursor: pointer;
  &:hover ${ItemImg} {
    transform: scale(1.11);
  }
`;

//Add Cart Button (se inicializa con BtnAddCart)
const AddCart = styled(BsBagPlusFill)`
  color: white;
  width: 70%;
  height: 70%;
  transition: transform 0.19s ease-in-out 0.08s;
`;
const BtnAddCart = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  cursor: pointer;
  &:hover ${AddCart} {
    transform: scale(1.11);
  }
`;
//See Details Button (se inicializa con BtnSeeDetails)
const SeeDetails = styled(BsEyeFill)`
  color: black;
  width: 60%;
  height: 50%;
  cursor: pointer;
  transition: transform 0.19s ease-in-out 0.03s;
`;
const BtnSeeDetails = styled(Link)`
  background-color: white;
  width: 100%;
  height: 100%;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover ${SeeDetails} {
    transform: scale(1.11);
  }
`;

const ItemTitle = styled.h1`
  font-size: 1.1rem;
  color: black;
  font-weight: 700;
  text-transform: uppercase;
`;
const ItemPrice = styled.h2`
  color: #a83737;
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
`;

