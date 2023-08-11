import styled from "styled-components/macro";
import { useEffect, useState } from "react";
import { CarouselTablet } from "./carousels/CarouselTablet";
import { CarouselMobile } from "./carousels/CarouselMobile";
import { CarouselContainer } from "./carousels/CarouselContainer";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // Delay of 1 second (1000 milliseconds)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  

  return (
    <>
      <Wrapper>
        {loading ? (
          <LoaderWrapper>
            <ClipLoader color="#194f44" size={30} />
          </LoaderWrapper>
        ) : (
          <Title>¡on sale!</Title>
        )}

        <CarouselWrapper>
          {windowWidth >= 900 && <CarouselContainer />}
          {windowWidth < 900 && windowWidth >= 580 && <CarouselTablet />}
          {windowWidth < 580 && <CarouselMobile />}
        </CarouselWrapper>
        <MiddleArticle>
          <ImgWrapper>
            <LinkImg to="/category/shirts">
              <MiddleItemsImg
                src="https://res.cloudinary.com/derdim3m6/image/upload/v1689881568/web%20access/samples%20for%20e-commerce/Landing%20Page/2023-07-17_15h11_03-removebg-preview_px49rf.png"
                alt=""
              />
              <TextWrapper>
                <MidImgText>
                  <Arrows>&#8594;</Arrows>
                  Shirts
                  <br />
                  <MidSpan>from</MidSpan>
                  <br />
                  $70
                </MidImgText>
              </TextWrapper>
            </LinkImg>
          </ImgWrapper>
          <ImgWrapper>
            <LinkImg to="/category/pants">
              <MiddleItemsImg
                src="https://res.cloudinary.com/derdim3m6/image/upload/v1689881569/web%20access/samples%20for%20e-commerce/Landing%20Page/2023-07-17_14h54_34-removebg-preview_p51ljr.png"
                alt=""
              />
              <TextWrapper>
                <MidImgText>
                  <Arrows>&#8594;</Arrows>
                  Pants
                  <br />
                  <MidSpan>from</MidSpan>
                  <br />
                  $80
                </MidImgText>
                ;
              </TextWrapper>
            </LinkImg>
          </ImgWrapper>
        </MiddleArticle>
          <StrechedArticle>
          <LinkStreched to="/category/shoes">
            <ShoesImg
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771909/web%20access/samples%20for%20e-commerce/Landing%20Page/2023-07-12_16h01_37-removebg-preview_g6ithw.png"
              alt=""
            />
            <ShoesImg
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771909/web%20access/samples%20for%20e-commerce/Landing%20Page/2023-07-12_16h01_45-removebg-preview_s2bmvf.png"
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
            </LinkStreched>
          </StrechedArticle>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  max-width: 1320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 20px 0;
  overflow: hidden;
`;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  margin-left: 35px;
`;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  color: rgb(99 86 86);
`;
const CarouselWrapper = styled.div`
  display: flex;
  margin: -16px auto 0;
  min-height: 570px;
  @media (max-width: 68rem) {
    max-width: 95%;
  }
`;
const MiddleArticle = styled.article`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 1rem;
`;
const MiddleItemsImg = styled.img`
  transition: transform 0.29s ease-in-out 0.1s;
  width: 645px;
`;
const ImgWrapper = styled.div`
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 5px;
  overflow: hidden;
  background-color: #e7e3e3;
  transition: background-color 0.4s ease-in-out;
  max-width: 100%;
  position: relative;
  &:hover ${MiddleItemsImg} {
    transform: scale(1.11);
  }
  &:hover {
    background-color: #fbfbfb;
  }
`;
const LinkImg = styled(Link)`
  text-decoration: none;
  color: black;
`;
const TextWrapper = styled.div`
  position: absolute;
  width: 80%;
  height: 155px;
  bottom: 200px;
  display: flex;
  right: 10%;
  background-color: rgba(190, 14.3, 40, 0.67);
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.15;
`;
const Arrows = styled.span`
  font-size: 2.8rem;
  margin-left: -60px;
  margin-right: 10px;
`;
const MidImgText = styled.h2`
  color: white;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 600;
  text-transform: uppercase;
`;
const MidSpan = styled.span`
  text-transform: lowercase;
  font-size: 1.5rem;
`;
const ShoesImg = styled.img`
  object-fit: contain;
  overflow: hidden;
  max-width: 33%;
  transition: transform 0.29s ease-in-out 0.1s;
`;
const TextDiv = styled.div`
  padding-left: 16px;
  transition: transform 0.29s ease-in-out 0.1s;
`;
const StrechedArticle = styled.article`
  cursor: pointer;
  overflow: hidden;
  width: 100%;
  height: 460px;
  max-width: 1330px;
  background-color: #ddd8d8;
  margin: 95px 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 5px;
  &:hover ${ShoesImg} {
    transform: scale(1.08);
  }
  &:hover ${TextDiv} {
    transform: scale(1.08);
  }
`;
const LinkStreched = styled(Link)`
  text-decoration: none;
  color: black;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.4s ease-in-out;
  &:hover {
    background-color: #f7f7f7;
  }
`;
const TextTitle = styled.h3`
  font-size: 2rem;
`;
const TextPromo = styled.h3`
  font-size: 5.6rem;
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
