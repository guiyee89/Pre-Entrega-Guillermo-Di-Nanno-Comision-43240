// import { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import styled from "styled-components/macro";
// import { InfoIcons } from "../../common/infoIcons/InfoIcons";

// export const HeroLanding = () => {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Wrapper>
//       <StyledCarousel
//         activeIndex={index}
//         onSelect={handleSelect}
//         interval={11114200}
//       >
//         <CarouselItem>
//           <CarouselImg
//             className="d-block w-100"
//             src="https://res.cloudinary.com/derdim3m6/image/upload/v1689955895/web%20access/samples%20for%20e-commerce/Hero/2023-07-21_12h32_14_uran3s.png"
//             alt="First slide"
//           />
//         </CarouselItem>
//         <CarouselItem>
//           <CarouselImg
//             className="d-block w-100"
//             src="https://res.cloudinary.com/derdim3m6/image/upload/v1689771372/web%20access/samples%20for%20e-commerce/Hero/2023-06-15_18h29_53_qtqorc600_gt3fsj.png"
//             alt="Second slide"
//           />
//         </CarouselItem>
//         <CarouselItem>
//           <CarouselImg
//             className="d-block w-100"
//             src="https://res.cloudinary.com/derdim3m6/image/upload/v1690152844/web%20access/samples%20for%20e-commerce/Hero/2023-07-23_19h52_40_qfvfmd.png"
//             alt="Third slide"
//           />
//         </CarouselItem>
//       </StyledCarousel>

//       <MarginWrapper>
//         <IconsWrapper>
//           <InfoIcons />
//         </IconsWrapper>
//       </MarginWrapper>
//     </Wrapper>
//   );
// };

import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components/macro";
import { InfoIcons } from "../../common/infoIcons/InfoIcons";

export const HeroLanding = () => {
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
          <picture>
            <source
              media="(max-width: 800px)"
              srcSet="https://res.cloudinary.com/derdim3m6/image/upload/v1693260737/web%20access/samples%20for%20e-commerce/Hero/2023-08-28_19h09_00_u5lsyj.png"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689955895/web%20access/samples%20for%20e-commerce/Hero/2023-07-21_12h32_14_uran3s.png"
              alt="First slide"
            />
          </picture>
        </CarouselItem>
        <CarouselItem>
          <picture>
            <source
              media="(max-width: 800px)"
              srcSet="https://res.cloudinary.com/derdim3m6/image/upload/v1693260732/web%20access/samples%20for%20e-commerce/Hero/2023-08-28_19h08_25_o7b0k6.png"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689955895/web%20access/samples%20for%20e-commerce/Hero/2023-07-21_12h32_14_uran3s.png"
              alt="First slide"
            />
          </picture>
        </CarouselItem>
        <CarouselItem>
          <picture>
            <source
              media="(max-width: 800px)"
              srcSet="https://res.cloudinary.com/derdim3m6/image/upload/v1693260737/web%20access/samples%20for%20e-commerce/Hero/2023-08-28_19h09_00_u5lsyj.png"
            />
            <CarouselImg
              className="d-block w-100"
              src="https://res.cloudinary.com/derdim3m6/image/upload/v1689955895/web%20access/samples%20for%20e-commerce/Hero/2023-07-21_12h32_14_uran3s.png"
              alt="First slide"
            />
          </picture>
        </CarouselItem>
      </StyledCarousel>

      <MarginWrapper>
        <IconsWrapper>
          <InfoIcons />
        </IconsWrapper>
      </MarginWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 110px auto 0;
  max-width: 1900px;
  z-index: 0;
  position: relative;
  max-height: 100%;
`;
const StyledCarousel = styled(Carousel)`
  @media (max-width: 1100px) {
    margin-bottom: 30px;
  }
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
    @media (max-width: 68rem) {
      background-color: #000000;
      width: 9px;
      height: 9px;
    }
    @media (max-width:500px){
      width: 6px;
      height: 6px;
    }
  }
  .carousel-indicators {
    @media (max-width: 68rem) {
      bottom: -50px;
    }
  }
`;
const CarouselItem = styled(Carousel.Item)`
  height: 0; /* Set initial height to 0 to allow images to determine the height */
  padding-top: 37.43%; /* Set a fixed aspect ratio (height / width) for the carousel items (You can adjust this value as needed) */
  position: relative; /* The value 52.43% represents an aspect ratio of approximately 1920px (width) and 1000px (height) */
  @media screen and (max-width: 800px) {
    padding-top: 131.43%;
  }
`;

const CarouselImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media screen and (max-width: 800px) {
    object-fit: contain;
  }
`;
const MarginWrapper = styled.div`
  margin: 0 36px;
`;

const IconsWrapper = styled.div`
  max-width: 1308px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: space-around;
  height: 85px;
  margin: 12px auto;
  padding: 12px 0 0 16px;
  background-color: rgb(253 253 253);

  border-bottom: 2px solid rgb(130 125 125 / 20%);
  @media (max-width: 68rem) {
    justify-content: space-between;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;
