import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components/macro";
import { InfoIcons } from "../../common/infoIcons/InfoIcons";

export const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Wrapper>
      <StyledCarousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={3200}
      >
        <CarouselItem>
          <CarouselImg
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1688223003/samples/ecommerce/Hero/2023-06-15_18h30_07_ojrorw600_voa2iv.png"
            alt="First slide"
          />
        </CarouselItem>
        <CarouselItem>
          <CarouselImg
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1688223008/samples/ecommerce/Hero/2023-06-15_18h29_53_qtqorc600_o94nla.png"
            alt="Second slide"
          />
        </CarouselItem>
        <CarouselItem>
          <CarouselImg
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1688223014/samples/ecommerce/Hero/2023-06-15_18h29_30_wnx8lf600_fwnrjj.png"
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
  margin: 127px auto 0;
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
`;

const CarouselItem = styled(Carousel.Item)`
  height: 100%;
`;

const CarouselImg = styled.img`
  height: 100%;
  object-fit: cover;
  @media (min-width: 68.75rem) {
    height: 520px;
    min-height: 200px;
  }
  @media (max-width: 68.75rem) {
    min-height: 200px;
    object-fit: cover;
  }
`;
const IconsWrapper = styled.div`
  max-width: 1100px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  height: 85px;
  margin: 0 auto;
  border-bottom: 1px solid #a4a0a0;
  padding-top: 20px;
`;
