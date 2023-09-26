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
            <Carousel.Item key={index}>
              <MainImg
                src={image}
                id={selectedItem?.id || (filteredItem?.id && filteredItem.id)}
              />
            </Carousel.Item>
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
    transition: opacity 0.6s ease;
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
const MainImgWrapper = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const MainImg = styled.img`
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  border: 1px solid lightgray;
  object-fit: contain;
`;
