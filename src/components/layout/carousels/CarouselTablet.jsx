import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components/macro";

export const CarouselTablet = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Wrapper>
      <StyledCarousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={5200}
      >
        <CarouselItem>
          <CarouselInner>
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193257/samples/ecommerce/Landing%20Page/2023-07-12_17h20_30_emnhec.png"
              alt="First slide"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193256/samples/ecommerce/Landing%20Page/2023-07-12_15h52_02_net48t.png"
              alt="Second slide"
            />
          </CarouselInner>
        </CarouselItem>
        <CarouselItem>
          <CarouselInner>
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193256/samples/ecommerce/Landing%20Page/2023-07-12_16h02_38_dm3ivo.png"
              alt="Third slide"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193256/samples/ecommerce/Landing%20Page/2023-07-12_16h02_38_dm3ivo.png"
              alt="Third slide"
            />
          </CarouselInner>
        </CarouselItem>

        <CarouselItem>
          <CarouselInner>
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193256/samples/ecommerce/Landing%20Page/2023-07-12_16h02_38_dm3ivo.png"
              alt="First slide"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193256/samples/ecommerce/Landing%20Page/2023-07-12_16h02_55_ufklk9.png"
              alt="Second slide"
            />
          </CarouselInner>
        </CarouselItem>
        <CarouselItem>
          <CarouselInner>
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193257/samples/ecommerce/Landing%20Page/2023-07-12_17h20_30_emnhec.png"
              alt="Third slide"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689193257/samples/ecommerce/Landing%20Page/2023-07-12_17h20_30_emnhec.png"
              alt="Third slide"
            />
          </CarouselInner>
        </CarouselItem>
      </StyledCarousel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 24px auto 110px;

  z-index: 0;
  position: relative;
  max-height: 520px;

  @media (max-width: 48rem) {
    max-height: 320px;
    min-height: 200px;
  }
`;
const StyledCarousel = styled(Carousel)`
  overflow: hidden;
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
  .carousel-control-next,
  .carousel-control-prev {
    width: 9%;
  }
  .carousel-indicators [data-bs-target] {
    margin-right: 15px;
    border-radius: 50%;
    width: 12px;
    height: 12px;
  }
  
`;
const CarouselItem = styled(Carousel.Item)`
  height: 100%;
  .carousel-item {
    display: flex;
    position: relative;
    float: left;
    width: 100%;
    margin-right: -100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform 0.8s ease-in-out;
  }
`;
const CarouselImg = styled.img`
  object-fit: contain;

  @media (min-width: 68.75rem) {
    height: 355px;
    min-height: 200px;
    width: 100%;
  }
  @media (max-width: 68.75rem) {
    height: 440px;
  }
`;
const CarouselInner = styled.div`
  max-width: 100%;
  margin: 0 auto;
  gap: 3rem;
  width: 300px;
  display: flex;
  justify-content: center;
`;
