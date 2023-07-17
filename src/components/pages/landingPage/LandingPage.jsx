import styled from "styled-components/macro";
import { CarouselDesktop } from "../../layout/carousels/CarouselDesktop";
import { CarouselTablet } from "../../layout/carousels/CarouselTablet";
import { CarouselMobile } from "../../layout/carousels/CarouselMobile";
import { useEffect, useState } from "react";

export const LandingPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Wrapper>
        <Title>on sale</Title>
        <CarouselWrapper>
          {windowWidth >= 900 && <CarouselDesktop />}
          {windowWidth < 900 && windowWidth >= 580 && <CarouselTablet />}
          {windowWidth < 580 && <CarouselMobile />}
        </CarouselWrapper>
        <ItemsArticle>
          <ItemsImg
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689617879/web%20access/samples%20for%20e-commerce/Shirts/2023-07-17_15h11_03_tsm1yc.png"
            alt=""
          />
          <ItemsImg
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689617952/web%20access/samples%20for%20e-commerce/Pants/2023-07-17_14h54_34_gke8nv.png"
            alt=""
          />
        </ItemsArticle>
        <StrechedArticle>
          <ShoesImg
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689217689/samples/ecommerce/Landing%20Page/2023-07-12_16h01_37-removebg-preview_pwulvx.png"
            alt=""
          />
          <ShoesImg
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689217689/samples/ecommerce/Landing%20Page/2023-07-12_16h01_45-removebg-preview_vh37p9.png"
            alt=""
          />

          <TextDiv>
            <TextTitle>All our Shoes</TextTitle>
            <TextPromo>30%off</TextPromo>
            <TextSub>On second unit </TextSub>
            <TextSub2 style={{ whiteSpace: "pre-line" }}>
              The best for your feet
              {"\n"}
              And your pocket
            </TextSub2>
          </TextDiv>
        </StrechedArticle>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  color: rgb(99 86 86);
`;
const CarouselWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1440px;
  @media (max-width:68rem) {
    width: 95%;
  }
`;
const ItemsArticle = styled.article`
  display: flex;
  justify-content: center;
  justify-content: space-between;
`;
const ItemsImg = styled.img`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 5px;
  width: 48%;
`;
const StrechedArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd8d8;
  margin: 70px 20px;
`;
const ShoesImg = styled.img`
  object-fit: contain;
  overflow: hidden;
  max-width: 35%;
`;
const TextDiv = styled.div`
  padding-left: 16px;
`;
const TextTitle = styled.h1`
  font-size: 2rem;
`;
const TextPromo = styled.h2`
  font-size: 6rem;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #b60404;
`;
const TextSub = styled.h3`
  font-size: 2rem;
`;
const TextSub2 = styled.p`
  font-size: 1.15rem;
`;
