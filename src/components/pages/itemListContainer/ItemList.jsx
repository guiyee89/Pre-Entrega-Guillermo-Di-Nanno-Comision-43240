import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { BsBagPlusFill, BsEyeFill } from "react-icons/bs";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

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
        const hasDiscount = "discount" in item; // Check if the item has the 'discount' property
        // const hasDiscount = Object.prototype.hasOwnProperty.call(item, 'discount');

        return (
          <ItemCard key={item.id}>
            <ImgWrapper to={`/item-details/${item.id}`}>
              <Loader>
                {isLoadingAdd && <ClipLoader color="#194f44" size={50} />}
                {isLoadingDetail && <ClipLoader color="#194f44" size={50} />}
              </Loader>
              <ItemImg variant="top" src={item.img} />
            </ImgWrapper>
            {hasDiscount && <Discount>-{item.discount}%</Discount>}
            <ButtonsWrapper disabled={item.stock === 0}>
              <BtnAddCart onClick={() => onAddCart(item)}>
                <AddCart onClick={() => handleLoadAdd(item.id)} />
              </BtnAddCart>

              <BtnSeeDetails onClick={() => handleLoadDetail(item.id)}>
                <SeeDetails />
              </BtnSeeDetails>
            </ButtonsWrapper>

            <InfoWrapper>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemSubTitle>{item.subtitle}</ItemSubTitle>
              {hasDiscount ? (
                <ItemPrice hasDiscount={hasDiscount}><DiscountPrice>$ {item.discountPrice} </DiscountPrice> $ {item.price}</ItemPrice>
              ) : (
                <ItemPrice>${item.price}</ItemPrice>
              )}
            </InfoWrapper>

            <NoStock disabled={item.stock > 0}>Out of stock</NoStock>
          </ItemCard>
        );
      })}
    </Wrapper>
  );
};
//Styled-components
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1300px;
  padding: 12px 0px;
  margin: 0px auto;
  gap: 16px;
  -webkit-box-pack: center;
  justify-items: center;
  align-items: center;
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
  display: ${({ disabled }) => (disabled ? "none" : "block")};
`;
const ItemImg = styled.img`
  max-height: 90%;
  margin: 0 auto;
  overflow: hidden;
  transition: transform 0.19s ease-in-out 0.08s;
  cursor: pointer;
  mix-blend-mode: darken;
`;
const ImgWrapper = styled(Link)`
  position: relative;
  background-color: rgb(239, 237, 237);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  &:hover ${ItemImg} {
    transform: scale(1.11);
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 8px 0 8px;
  background-color: rgb(239 237 237);
`;
const ItemCard = styled.div`
  color: black;
  background-color: rgb(239 237 237);
  display: flex;
  flex-direction: column;
  height: 450px;
  width: 370px;
  align-items: center;
  margin-bottom: 24px;
  justify-content: center;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 5px;
  &:hover {
    ${ButtonsWrapper} {
      opacity: 1;
      transform: translateX(-20px);
      transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
    }
    ${InfoWrapper}, ${ImgWrapper} {
      background-color: white;
      transition: background-color ease-in-out 0.4s;
    }
    ${ItemImg} {
      transform: scale(1.11);
      mix-blend-mode: darken;
    }
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
const NoStock = styled.p`
  background-color: #b30c0c;
  color: white;
  width: 115px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 5px;
  display: ${({ disabled }) => (disabled ? "none" : "block")};
  text-transform: uppercase;
`;
const ItemTitle = styled.h2`
  font-size: 0.9rem;
  color: black;
  font-weight: 700;
  word-spacing: 3px;
  text-transform: uppercase;
`;
const ItemSubTitle = styled.h3`
  font-size: 0.8rem;
`;
const DiscountPrice = styled.span`
  color: #a83737;
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 6px 0 8px 0;
  &::before {
    content: "";
    position: absolute;
    bottom: 19px;
    width: 18%;
    left: 184px;
    border-top: 0.1rem solid rgb(75, 73, 73);
  }
`
const ItemPrice = styled.h4`
  color: ${(props) => (props.hasDiscount ? 'rgb(149 146 146)' : '#a83737')};
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 6px 0 8px 0;
`;
const Discount = styled.h4`
  position: absolute;
  top: 20px;
  left: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #b34646;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 2.8;
  cursor: pointer;
`;
