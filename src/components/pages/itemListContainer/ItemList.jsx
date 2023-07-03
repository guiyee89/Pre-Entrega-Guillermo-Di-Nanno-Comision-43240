import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { BsBagPlusFill, BsEyeFill } from "react-icons/bs";
import { useState } from "react";
import { LoaderCircle } from "../../common/Loaders/LoaderCircle";

export const ItemList = ({ items, onAddCart, navigate }) => {
  //Algoritmo para randomear listado te Items
  // const [shuffledItems, setShuffledItems] = useState([]);

  // //Algoritmo de Fisher-Yates para renderizar los productos de manera aleatoria
  // useEffect(() => {
  //   const shuffleArray = (array) => {
  //     const shuffledArray = [...array];
  //     for (let i = shuffledArray.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [shuffledArray[i], shuffledArray[j]] = [
  //         shuffledArray[j],
  //         shuffledArray[i],
  //       ];
  //     }
  //     return shuffledArray;
  //   };
  //   setShuffledItems(shuffleArray(items));
  // }, [items]);

  const [loadingDetail, setLoadingDetail] = useState(false);

  const [loadingAdd, setLoadingAdd] = useState(false);

  //Evento loader para BtnSeeDetail
  const handleLoadDetail = (itemId) => {
    setLoadingDetail(itemId);

    setTimeout(() => {
      setLoadingDetail(true);
      navigate(`/item-details/${itemId}`);
    }, 800);
  };
  //Evento loader para BtnAddCart
  const handleLoadAdd = (itemId) => {
    setLoadingAdd(itemId);

    setTimeout(() => {
      setLoadingAdd(true);
    }, 1100);
  };

  return (
    <Wrapper key="cart-wrapper">
      {/* Mapeo de productos */}
      {items.map((item) => {
        const isLoadingDetail = loadingDetail === item.id;
        const isLoadingAdd = loadingAdd === item.id;
        return (
          <ItemCard style={{ width: "288px" }} key={item.id}>
            {/* Imagen */}
            <ImgWrapper to={`/item-details/${item.id}`}>
              <Loader>
                {isLoadingAdd && <LoaderCircle />}
                {isLoadingDetail && <LoaderCircle />}
              </Loader>
              <ItemImg variant="top" src={item.img} />
            </ImgWrapper>

            {/* Buttons */}
            <ButtonsWrapper>
              <BtnAddCart onClick={() => onAddCart(item)}>
                <AddCart onClick={() => handleLoadAdd(item.id)} />
              </BtnAddCart>

              <BtnSeeDetails onClick={() => handleLoadDetail(item.id)}>
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
//Styled-components
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
const ButtonsWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  background-color: #873c3c;
  width: 40px;
  height: 40px;
  opacity: 0;
  transform: translateX(20px);
  /* &:hover {
    background-color: #d75454;
  } */
`;
const ItemCard = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  height: 350px;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 24px;
  justify-content: center;
  position: relative;
  max-width: 250px;
  box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px;
  &:hover ${ButtonsWrapper} {
    opacity: 1;
    transform: translateX(-20px);
    transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }
`;
const ItemImg = styled.img`
  max-width: 100%;
  max-height: 70%;
  margin: 0 auto;
  overflow: hidden;
  transition: transform 0.19s ease-in-out 0.08s;
  cursor: pointer;
`;
const ImgWrapper = styled(Link)`
  position: relative;
  /* box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 5px; */
  background-color: #eeeeee;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /* margin-bottom: 8px; */
  overflow: hidden;
  cursor: pointer;
  &:hover ${ItemImg} {
    transform: scale(1.11);
  }
`;
const Loader = styled.div`
  position: absolute;
  top: 5px;
  right: 100px;
`;
const AddCart = styled(BsBagPlusFill)`
  color: white;
  width: 70%;
  height: 70%;
  transition: transform 0.19s ease-in-out 0.08s;
  &:active {
    color: #8d5050;
    transition: transform 0.15s ease-in-out;
  }
`;
const BtnAddCart = styled.button`
  &:active {
    background-color: #efc0c0;
    transition: background-color 0.1s ease-in-out;
  }
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5px;
  cursor: pointer;
  &:hover ${AddCart} {
    transform: scale(1.3);
  }
  &:hover {
    background-color: #d75454;
    transition: background-color 0.2s ease-in-out;
  }
`;
const SeeDetails = styled(BsEyeFill)`
  color: black;
  width: 60%;
  height: 50%;
  cursor: pointer;
  transition: transform 0.19s ease-in-out 0.03s;
`;
const BtnSeeDetails = styled(Link)`
  &:active {
    background-color: #e3e0e0;
    transition: background-color 0.1s ease-in-out;
  }
  background-color: white;
  width: 100%;
  height: 100%;
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #e1e1e1;
    transition: background-color ease-in-out 0.3s;
  }
  &:hover ${SeeDetails} {
    transform: scale(1.3);
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
