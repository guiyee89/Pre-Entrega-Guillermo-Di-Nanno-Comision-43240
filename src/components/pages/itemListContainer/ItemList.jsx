import styled from "styled-components/macro";
import { BsEyeFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { Pagination, PaginationItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useScrollRestoration from "../../hooks/useScrollRestoration";

export const ItemList = ({ items, navigate, currentPage, setCurrentPage }) => {
  useScrollRestoration()
  //////////////////////////                    ////////////////////////////
  //-------------------     FILTER DUPLICATED ITEM    -------------------//
  // Function to filter products based on their customId and color to avoid duplicates
  // const filterProducts = () => {
  //   const productMap = new Map();

  //   items.forEach((product) => {
  //     const { userId, color } = product;
  //     const key = `${userId}-${color}`;

  //     // Check if the product's customId and color combination already exists in the productMap
  //     if (!productMap.has(key)) {
  //       // If not, add the product to the productMap
  //       productMap.set(key, product);
  //     }
  //   });

  //   // Convert the Map values to an array of filtered products
  //   return Array.from(productMap.values());
  // };

  // // FILTER THE PRODUCTS WITH THE FUNCTION
  // const filteredItems = filterProducts();

  //////////////////////////                    ////////////////////////////
  //-------------------    LOADING + currentPage    ---------------------//
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { categoryName } = useParams(); //useParams de react-router-dom para filtrar productos por categoryName
  const categoryTitle = categoryName ? categoryName : "All  Categories"; // Rendering conditional title

  //Evento loader para BtnSeeDetail
  const handleLoadDetail = (itemId) => {
    // Store the current page in local storage
    localStorage.setItem("currentPage", currentPage); //save currentPage in localStorage

    setLoadingDetail(itemId);
    setTimeout(() => {
      setLoadingDetail(true);
      // navigate(`/item-details/${itemId}`);
    }, 1600);
  };
  //--------    TOP LOADING    --------//
  const ref = useRef();

  const handleLoadTop = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
    }, 1100);
  };

  //////////////////////////                    ////////////////////////////
  //-------------------         PAGINATION          ---------------------//
  const itemsPerPage = 27;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  //scroll back to top of page when change pagination
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  //set currentPage to 1 if there are changes in filters
  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
    localStorage.removeItem("currentPage")
  }, []);

  ///////////////////////////                  /////////////////////////////

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
  return (
    <>
      <HeaderWrapper>
        <ItemListTitle>{categoryTitle}</ItemListTitle>
        <PaginationWrapperTop>
          <Pagination
            size="large"
            variant="outlined"
            count={totalPages} // Set the count to the total number of pages
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            renderItem={(item) => <PaginationItem component="div" {...item} />}
          />
        </PaginationWrapperTop>
      </HeaderWrapper>
      <Wrapper key="cart-wrapper">
        <LoadingBar color="#c85f2f" shadow={true} ref={ref} height={4} />
        {/* Map products list */}
        {itemsToDisplay.map((product) => {
          const isLoadingDetail = loadingDetail === product.id;
          const hasDiscount = "discount" in product;

          return (
            <ItemWrapper
              key={product.id}
              onClick={(event) => {
                event.preventDefault(); // Prevent immediate navigation
                handleLoadDetail(product.id);
                handleLoadTop();
                setTimeout(() => {
                  navigate(`/item-details/${product.id}`);
                }, 1600); // Delay in milliseconds
              }}
            >
              <Loader>
                {isLoadingDetail && <ClipLoader color="#194f44" size={60} />}
              </Loader>
              <ItemCard>
                <ImgWrapperLink>
                  <ItemImg variant="top" src={product.img[0]} />
                </ImgWrapperLink>
                {hasDiscount && <Discount>-{product.discount}%</Discount>}

                <ButtonsWrapper>
                  <BtnSeeDetails>
                    <SeeDetails />
                  </BtnSeeDetails>
                </ButtonsWrapper>
              </ItemCard>
              <InfoWrapper>
                <ItemTitle>{product.title}</ItemTitle>
                <ItemSubTitle>{product.subtitle}</ItemSubTitle>
                {hasDiscount ? (
                  <ItemPriceWrapper hasDiscount={hasDiscount}>
                    {hasDiscount && (
                      <DiscountPrice>$ {product.discountPrice}</DiscountPrice>
                    )}
                    <Price hasDiscount={hasDiscount}>$ {product.price}</Price>
                  </ItemPriceWrapper>
                ) : (
                  <Price>$ {product.price}</Price>
                )}
              </InfoWrapper>
            </ItemWrapper>
          );
        })}
      </Wrapper>
      {/* Pagination */}
      <PaginationWrapperBottom>
        <Pagination
          size="large"
          variant="outlined"
          count={totalPages} // Set the count to the total number of pages
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          renderItem={(item) => <PaginationItem component="div" {...item} />}
        />
      </PaginationWrapperBottom>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1400px;
  padding: 2px 16px;
  margin: 0px 10px 0 0;
  gap: 0.6rem;
  -webkit-box-pack: center;
  justify-items: center;
  align-items: center;
  background-color: rgb(253 253 253);
`;
const ButtonsWrapper = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  background-color: #873c3c;
  width: 40px;
  height: 40px;
  opacity: 0;
  transform: translateX(20px);
  display: ${({ disabled }) => (disabled ? "none" : "block")};
`;
const SeeDetails = styled(BsEyeFill)`
  color: black;
  width: 60%;
  height: 50%;
  cursor: pointer;
  transition: transform 0.19s ease-in-out 0.03s;
`;
const BtnSeeDetails = styled.span`
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
const ItemImg = styled.img`
  margin: 0 auto;
  overflow: hidden;
  transition: transform 0.19s ease-in-out 0.08s;
  cursor: pointer;
  mix-blend-mode: darken;
`;
const ImgWrapperLink = styled.div`
  position: relative;
  background-color: rgb(239, 237, 237);
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
  padding: 0px 8px 22px;
  background-color: rgb(239 237 237);
`;
const ItemWrapper = styled(Link)`
  text-decoration: none;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 3px;
  position: relative;
  cursor: pointer;
  max-width: 430px;
  background-color: rgb(239, 237, 237);
  &:hover {
    ${ButtonsWrapper} {
      opacity: 1;
      transform: translateX(-20px);
      transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out;
    }
    ${ItemImg} {
      transform: scale(1.11);
      mix-blend-mode: darken;
    }
    /* ${InfoWrapper}, ${ImgWrapperLink} {
      background-color: white;
      transition: background-color ease-in-out 0.4s;
    } */
  }
`;
const ItemCard = styled.div`
  color: black;
  background-color: rgb(239 237 237);
  display: flex;
  flex-direction: column;
  aspect-ratio: 1/1;
  align-items: center;
  margin-bottom: 8px;
  justify-content: center;
  /* box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 3px; */
`;
const Loader = styled.div`
  position: absolute;
  top: 90%;
  right: 40%;
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
  color: black;
`;
const DiscountPrice = styled.span`
  color: #a83737;
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 6px 0;
  position: relative;
  display: inline-block;
  text-align: center;
`;
const Price = styled.span`
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
  padding: 6px 0 8px 0;
  position: relative;
  color: ${(props) => (props.hasDiscount ? "rgb(149 146 146)" : "#a83737")};
  /* Add the following styles to create the strike-through line if hasDiscount is true */
  &::after {
    content: ${(props) => (props.hasDiscount ? "''" : "none")};
    position: absolute;
    bottom: 52%;
    left: 0;
    width: 102%;
    height: 1px;
    background-color: black;
  }
`;
const ItemPriceWrapper = styled.h4`
  display: flex;
  gap: 0.3rem;
`;
const Discount = styled.h4`
  position: absolute;
  top: 20px;
  left: 8%;
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
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 0 15px 75px;
  -webkit-box-align: center;
  align-items: center;
`;
const PaginationWrapperTop = styled.div`
   display: flex;
  width: 100%;
  margin: 0 0 15px -280px;
  justify-content: center;
`
const PaginationWrapperBottom = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0 40px;
  justify-content: center;
`;
const ItemListTitle = styled.h1`
  min-width: 240px;
  color: #2b2929;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: capitalize;
`;
