import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components/macro";

export const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Wrapper>
      <Carousel activeIndex={index} onSelect={handleSelect}  interval={3200}>
        <CarouselItem>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1686864999/samples/ecommerce/Hero/2023-06-15_18h30_07_ojrorw.png"
            alt="First slide"
          />
        </CarouselItem>
        <CarouselItem>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1686864995/samples/ecommerce/Hero/2023-06-15_18h29_30_wnx8lf.png"
            alt="Second slide"
          />

        </CarouselItem>
        <CarouselItem>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/derdim3m6/image/upload/v1686864994/samples/ecommerce/Hero/2023-06-15_18h29_53_qtqorc.png"
            alt="Third slide"
          />
        </CarouselItem>
      </Carousel>
    </Wrapper>
  );
};
const Wrapper = styled.div`
    margin: 16px auto;
    max-width: 1800px;
`;
const CarouselItem = styled(Carousel.Item)`
    max-height: 520px;
`