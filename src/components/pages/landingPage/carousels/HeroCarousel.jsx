import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components/macro";
import { InfoIcons } from "../../../common/infoIcons/InfoIcons";


export const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Wrapper>
      <StyledCarousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={4200}
      >
        <CarouselItem>
          <CarouselImg
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771372/web%20access/samples%20for%20e-commerce/Hero/2023-06-15_18h29_53_qtqorc600_gt3fsj.png"
            alt="First slide"
          />
        </CarouselItem>
        <CarouselItem>
          <CarouselImg
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771373/web%20access/samples%20for%20e-commerce/Hero/2023-06-15_18h29_30_wnx8lf600_nkjhmm.png"
            alt="Second slide"
          />
        </CarouselItem>
        <CarouselItem>
          <CarouselImg
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771371/web%20access/samples%20for%20e-commerce/Hero/2023-06-15_18h30_07_ojrorw600_old1wz.png"
            alt="Third slide"
          />
        </CarouselItem>
      </StyledCarousel>

      <IconsWrapper>
        <InfoIcons />
      </IconsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 110px auto 0;
  max-width: 1800px;
  z-index: 0;
  position: relative;
  max-height: 520px;

  @media (max-width: 48rem) {
    max-height: 320px;
    min-height: 200px;
  }
`;
const StyledCarousel = styled(Carousel)`
  .carousel-slide {
    min-height: 300px;
    max-height: 520px;
    @media (max-width: 48rem) {
      height: 320px;
      min-height: 200px;
    }
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    width: 2rem;
    height: 3rem;

    background-color: rgba(0, 0, 0, 0.55);
  }
  .carousel-indicators [data-bs-target] {
    margin-right: 15px;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    @media (max-width:68rem) {
      background-color: #000000;
    }
  }
  .carousel-indicators{
    @media (max-width:68rem) {
        bottom: -50px;
    }
  }
`;
const CarouselItem = styled(Carousel.Item)`
  height: 100%;
  transition: transform 0.2s ease-in-out;
  
`;
const CarouselImg = styled.img`
  height: 100%;
  object-fit: cover;
  @media (min-width: 68.75rem) {
    height: 580px;
    min-height: 200px;
  }
  @media (max-width: 68.75rem) {
    min-height: 200px;
    object-fit: cover;
  }
`;
const IconsWrapper = styled.div`
  max-width: 1250px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: space-around;
  height: 85px;
  margin: 12px auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 3px;
  padding-top: 20px;
  @media (max-width:68rem){
    display: none;
  }
`;
