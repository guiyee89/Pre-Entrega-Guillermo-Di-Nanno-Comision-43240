import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Carousel from "react-bootstrap/Carousel"; // Import the Carousel component
import NextButtonSVG from "../../../../assets/arrow-right-336-svgrepo-com.svg"; // Import your custom next button SVG
import PrevButtonSVG from "../../../../assets/arrow-left-335-svgrepo-com.svg";

export const ItemImageMobile = ({ filteredItem, selectedItem }) => {
  const [selectedImage, setSelectedImage] = useState({});
  const [imagesToRender, setImagesToRender] = useState([]);

  useEffect(() => {
    // When the selectedItem changes, update the imagesToRender state with the selectedItem images
    if (selectedItem) {
      setImagesToRender(selectedItem.img.slice(0, 5));
      setSelectedImage({ image: selectedItem.img[0], index: 0 }); // Set the first image as selected by default
    }
  }, [selectedItem]);

  useEffect(() => {
    // When the filteredItem changes, update the imagesToRender state with the filteredItem images
    if (filteredItem && Object.keys(filteredItem).length > 0) {
      setImagesToRender(filteredItem.img.slice(0, 5));
      setSelectedImage({ image: selectedItem.img[0], index: 0 }); // Set the first image as selected by default
    }
  }, [filteredItem]);

  const handleImageSwitch = (newIndex) => {
    setSelectedImage({ image: imagesToRender[newIndex], index: newIndex });
  };

  return (
    <Wrapper>
      <MainImgWrapper>
        <StyledCarousel
          interval={null}
          activeIndex={selectedImage.index}
          onSelect={handleImageSwitch}
        >
          {imagesToRender.map((image, index) => (
            <CarouselItem key={index}>
              <MainImg
                src={image}
                id={selectedItem?.id || (filteredItem?.id && filteredItem.id)}
              />
            </CarouselItem>
          ))}
        </StyledCarousel>
      </MainImgWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  align-items: flex-start;
  position: relative;
  @media (max-width: 550px) {
    margin-bottom: 10px;
    width: 95%;
  }
`;
const StyledCarousel = styled(Carousel)`
  .carousel-indicators [data-bs-target] {
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 25px;
    height: 3px;
    padding: 0px;
    margin-right: 8px;
    margin-left: 7px;
    text-indent: -999px;
    cursor: pointer;
    background-color: #000;
    background-clip: padding-box;
    border: 0;
    border-top: 11px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.3;
    transition: opacity 0.1s ease-in-out;
  }
  .carousel-indicators .active {
    opacity: 1;
  }
  .carousel-control-next {
    right: -10px;
  }
  .carousel-control-next-icon {
    background-image: url(${NextButtonSVG});
  }
  .carousel-control-prev {
    left: -10px;
  }
  .carousel-control-prev-icon {
    background-image: url(${PrevButtonSVG});
  }
`;
const CarouselItem = styled(Carousel.Item)`
  aspect-ratio: 1/1;
`;
const MainImgWrapper = styled.div`
  display: flex;
`;
const MainImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
`;
